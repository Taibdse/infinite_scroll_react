import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            count: 30,
            start: 1 
        };
    }

    componentDidMount = () => {
        const { count, start } = this.state;
        axios.get(`/api/photos?count=${count}&start=${start}`)
        .then(res => this.setState({ images: res.data }))
    }

    fetchImages = () => {
        const { count, start, images } = this.state;
        this.setState({ start: start + count })
        axios.get(`/api/photos?count=${count}&start=${start}`)
        .then(res => this.setState({ images: images.concat(res.data) }))
    }

    render() {
        console.log(this.state.images);
        let { images } = this.state;
        return (
            <div>
                <div style={{ position:"fixed", top:'20px', right:'50px' }}>{ images.length } images</div>
                <div className="images">
                    <InfiniteScroll 
                    dataLength={images.length} 
                    next={this.fetchImages} 
                    hasMore={true} 
                    loader={<h3>Loading...</h3>}>
                        { images.map(image => (
                            <Image key={image.id} image={image}/>
                        )) }
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default Images;
