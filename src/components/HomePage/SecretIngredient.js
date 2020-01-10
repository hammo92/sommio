import React from 'react'
import ScrollText from './scrollText'

const SecretIngredient = () => {
  return (
    <div className="container-fluid secretContain">
       <ScrollText></ScrollText>
      <div className="row">
        
        <div className="col-12 col-lg-5">
          <div className="secretingredient-boxs">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever
              since the dummy text of the printing and typesetting
              industry.
            </p>
  {/* <button className="btn btn-primary">Discover Yours</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SecretIngredient
