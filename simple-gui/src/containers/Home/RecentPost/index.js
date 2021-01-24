import React from 'react'
import Card from '../../../components/Ui/Card'
import "./style.css"
import pediatricSpecial from "../../../blogPostImages/doctors-patient-ray.jpg"


const RecentPost = (props) => {
  return (
    <div style={props.style}>
      <Card style={{ marginBottom: "20px" }}>
        <div className="postImageWrapper">
          <img src={pediatricSpecial} alt="Pediatric appointment" />
        </div>

        <div style={{ textAlign: "center" }}>
          <span>Featured</span>
          <h2>Fitness Mantra to Live Fit Life</h2>
          <span>posted on July 21, 2020 by Costin Lungu</span>
          <p>Midst first it, you're multiply divided. There don't, second his one given the...</p>

          <button>Read More</button>

        </div>
      </Card>
      <Card style={{ marginBottom: "20px" }}>
        Post 2
					</Card>
    </div>
  )

}

export default RecentPost