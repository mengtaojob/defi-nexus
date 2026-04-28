import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Account, Address } from 'viem'
import { parseUnits } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { erc20Abi } from '../../abi/erc20'
import { queryKeys } from '../../lib/query/keys'
import { useTxStore } from '../../store/tx.store'

interface ApproveParams {
  token: Address
  spender: Address
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

export function useErc20Approve() {
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
      summary: 'ERC20 approval',
    })
  }, [addTransaction, write.data, write.variables?.chainId])

  useEffect(() => {
    if (!write.data || !write.variables?.chainId || !write.variables.args) {
      return
    }

    const owner = resolveAccountAddress(write.variables.account)
    const spender = write.variables.args[0] as Address
    const token = write.variables.address

    if (receipt.isSuccess) {
      updateTransactionStatus(write.data, 'success')

      if (owner && token) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.allowance(write.variables.chainId, owner, spender, token),
        })

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

  const approve = async ({ token, spender, amount, decimals, chainId, owner }: ApproveParams) => {
    const parsedAmount = parseUnits(amount, decimals)

    await write.writeContractAsync({
      abi: erc20Abi,
      chainId,
      address: token,
      functionName: 'approve',
      args: [spender, parsedAmount],
      account: owner,
    })
  }

  return {
    approve,
    txHash: write.data,
    isSubmitting: write.isPending,
    isConfirming: receipt.isLoading,
    isSuccess: receipt.isSuccess,
    error: write.error ?? receipt.error,
  }
}
