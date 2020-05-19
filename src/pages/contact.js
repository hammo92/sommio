import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { navigate } from 'gatsby'
import Layout from "../components/Layout/Layout";
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import AniText from '../components/AnimatedText/AniText'

const ContactInner = () => {
  const [values, setValues] = useState('')

  const url = 'https://sommio.netlify.com/.netlify/functions/contact_form'

  let data = {
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message
  }

  const handleForm = async () => {
    console.log('handleForm')
    let response = await axios.post(url, data).catch(error => {
      console.log('serverless function error => ', error)
    })
    navigate(`/thankyou`)

    console.log('serverless response => ', response)
  }

  const formValues = e => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="container-fluid contactForm">
    <AniText type={"h1"}>
      Get in touch
    </AniText>
    <Form onSubmit={handleForm}>
      {({ handleSubmit, form, submitting, pristine, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="frm_grp">
              <Field name="name">
                {({ input, meta }) => (
                  <div className="form-group">
                    <input
                      {...input}
                      type="text"
                      id="name"
                      placeholder="Name"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="name">Name</label>
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp">
              <Field name="email">
                {({ input, meta }) => (
                  <div className="form-group">
                    <input
                      {...input}
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="email">Email</label>
                  </div>
                )}
              </Field>
            </div>
            <div className="frm_grp">
              <Field name="subject">
                {({ input, meta }) => (
                  <div className="form-group">
                    <input
                      {...input}
                      type="text"
                      placeholder="Subject"
                      id="subject"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="subject">Subject</label>
                  </div>
                )}
              </Field>
            </div>
            <div className="frm_grp">
              <Field name="message">
                {({ input, meta }) => (
                  <div className="form-group">
                    <input
                      {...input}
                      type="text"
                      placeholder="Message"
                      component="textarea"
                      id="message"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="message">Message</label>
                  </div>
                )}
              </Field>
            </div>
            <div>
              <button className="btn btn-info ml-auto" type="submit">Submit</button>
            </div>
          </form>
        )
      }}
    </Form>
    </div>

  )
}

const ContactPage = () => {
  return (
    <TransitionState>
      {({transitionStatus}) => (
        <Layout transitionStatus={transitionStatus}>
          <ContactInner transitionStatus={transitionStatus}/>
        </Layout>
      )}
    </TransitionState>
  )
}
export default ContactPage
