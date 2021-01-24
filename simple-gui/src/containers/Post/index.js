import React from 'react'
import BlogPost from '../../components/BlogPost'
import Sidebar from '../../components/Sidebar'
// eslint-disable-next-line
import Card from '../../components/Ui/Card'
import './style.css'


const Post = (props) => {

	console.log(props);

	return (
		<section className="container">
			<BlogPost {...props} />
			<Sidebar {...props} />
		</section>
	)
}

export default Post