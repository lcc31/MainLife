import React from 'react';
import Sidebar from '../../components/Sidebar';
import './style.css';
import pediatricSpecial from "../../blogPostImages/pediatrics-special-needs.jpg"
import Card from '../../components/Ui/Card';
import RecentPost from './RecentPost';
import pediatricPhysiotherapy from '../../blogPostImages/Paediatric-Physiotherapy-1.jpg'
import osteopathyColon from '../../blogPostImages/osteopathy1.jpg'

const SideImage = props => {
	return (
		<div style={{ height: `${props.sideImageHeight}px` }}>
			<img src={props.src} alt="" />
		</div>
	)
}

const Home = props => {
	const galleryHeight = 450;
	const galleryStyle = {
		height: galleryHeight + "px",
		overflow: "hidden"
	}

	const sideImageHeight = galleryHeight / 3;

	return (
		<div>
			<Card>
				<div className="galleryPost" style={{ galleryStyle }}>
					<section style={{ width: "70%" }}>
						<div>
							<img src={pediatricSpecial} alt="Pediatric appointment" />
						</div>
					</section>
					<section className={"sideImageWrapper"} style={{ width: "30%" }}>
						<SideImage
							height={sideImageHeight}
							src={pediatricPhysiotherapy}
						/>
						<SideImage
							height={sideImageHeight}
							src={osteopathyColon}
						/>
					</section>
				</div>
			</Card>

			<section className="HomeContainer">
				<RecentPost style={{ width: "70%" }} />
				<Sidebar />
			</section>

		</div >
	);
}

export default Home;