import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Account, Address } from 'viem'
import { parseUnits } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { erc20Abi } from '../../abi/erc20'
import { mapChainError } from '../../lib/errors/mapChainError'
import { queryKeys } from '../../lib/query/keys'
import { useTxStore } from '../../store/tx.store'

interface TransferParams {
  token: Address
  to: Address
  amount: string
  decimals: number
  chainId: number
  owner: Address
}

function resolveAccountAddress(account: Address | Account | null | undefined): Address | undefined {
  if (!account) {
    return undefined
  }

  return typeof account === 'string' ? account : account.address
}

export function useErc20Transfer() {
  const queryClient = useQueryClient()
  const addTransaction = useTxStore((state) => state.addTransaction)
  const updateTransactionStatus = useTxStore((state) => state.updateTransactionStatus)

  const write = useWriteContract()

  const receipt = useWaitForTransactionReceipt({
    chainId: write.variables?.chainId,
    hash: write.data,
    query: { enabled: Boolean(write.data) },
  })

  useEffect(() => {
    if (!write.data || !write.variables?.chainId) {
      return
    }

    addTransaction({
      hash: write.data,
      chainId: write.variables.chainId,
      status: 'pending',
      summary: 'ERC20 transfer',
      createdAt: Date.now(),
    })
  }, [addTransaction, write.data, write.variables?.chainId])

  useEffect(() => {
    if (!write.data || !write.variables?.chainId) {
      return
    }

    const owner = resolveAccountAddress(write.variables.account)
    const token = write.variables.address

    if (receipt.isSuccess) {
      updateTransactionStatus(write.data, 'success')

      if (owner && token) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.tokenBalance(write.variables.chainId, owner, token),
        })

        queryClient.invalidateQueries({
          queryKey: queryKeys.portfolio(write.variables.chainId, owner),
        })
      }
    }

    if (receipt.isError) {
      updateTransactionStatus(write.data, 'failed')
    }
  }, [queryClient, receipt.isError, receipt.isSuccess, updateTransactionStatus, write.data, write.variables])

  const transfer = async ({ token, to, amount, decimals, chainId, owner }: TransferParams) => {
    const parsedAmount = parseUnits(amount, decimals)

    try {
      await write.writeContractAsync({
        abi: erc20Abi,
        chainId,
        address: token,
        functionName: 'transfer',
        args: [to, parsedAmount],
        account: owner,
      })
    } catch (error) {
      throw mapChainError(error)
    }
  }

  return {
    transfer,
    txHash: write.data,
    isSubmitting: write.isPending,
    isConfirming: receipt.isLoading,
    isSuccess: receipt.isSuccess,
    error: write.error ? mapChainError(write.error) : receipt.error ? mapChainError(receipt.error) : null,
  }
}
