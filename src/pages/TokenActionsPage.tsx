import { ApproveForm } from '../components/token/ApproveForm'
import { TransferForm } from '../components/token/TransferForm'

export function TokenActionsPage() {
  return (
    <div className="page">
      <h2 className="page-title">Token Actions</h2>
      <section className="page-card">
        <ApproveForm />
      </section>
      <section className="page-card">
        <TransferForm />
      </section>
    </div>
  )
}
