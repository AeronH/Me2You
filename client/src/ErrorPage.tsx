import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div>
        <h1 className="font-extrabold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}

export default ErrorPage