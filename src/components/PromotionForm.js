import React from 'react'
import { Form } from 'react-final-form'

import Input from './Input'

export default function PromotionForm({ addPromotion }) {
  return (
    <Form onSubmit={({ code }) => addPromotion(code)}>
      {({ handleSubmit, submitting, invalid }) => (
        <form onSubmit={handleSubmit}>
          <div className="inline-flex">
            <Input name="code" placeholder='Try "SAVE50"' hideError />

            <button
              type="submit"
              className="appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none ml-3 mt-6 no-underline"
              disabled={submitting || invalid}
            >
              Add code
            </button>
          </div>
        </form>
      )}
    </Form>
  )
}
