import { ApproveForm } from '../components/token/ApproveForm'
import { TransferForm } from '../components/token/TransferForm'

export function TokenActionsPage() {
  return (
    <div>
      <h1>Token Actions</h1>
      <ApproveForm />
      <TransferForm />
    </div>
  )
}
