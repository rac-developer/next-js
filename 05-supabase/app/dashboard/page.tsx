export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <form action="/auth/signout" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
      </form>
    </main>
  )
}
