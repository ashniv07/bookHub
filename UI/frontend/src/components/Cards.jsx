import React from 'react';
import fantasy from '../assets/fantasy.jpg';
import horror from '../assets/horror.jpg';
import scifi from '../assets/sci-fi.jpg';
import romance from '../assets/romance.jpg'
import comic from '../assets/comic.jpg'
import selfhelp from '../assets/selfhelp.jpg'
import study from '../assets/study.jpg'
import thriller from '../assets/Thriller.jfif'

const Cards = () => {

    return (
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row">
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem"}}>
                        <img className="card-img-top" src={fantasy} alt="Card image cap" style={{height:"17rem"}} />
                        <div className="card-body">
                            <p className="card-text">
                                Fantasy
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem"}}>
                        <img className="card-img-top" src={horror} alt="Card image cap" style={{height:"17rem"}}/>
                        <div className="card-body">
                            <p className="card-text">
                                Horror
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={scifi} alt="Card image cap" style={{height:"17rem"}}/>
                        <div className="card-body">
                            <p className="card-text">
                               Science Fiction
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={comic} alt="Card image cap" style={{height:"17rem"}}/>
                        <div className="card-body">
                            <p className="card-text">
                                Comics
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={romance} alt="Card image cap" style={{height:"17rem"}}/>
                        <div className="card-body">
                            <p className="card-text">
                                Romance
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={thriller} alt="Card image cap" style={{height:"17rem"}}/>
                        <div className="card-body">
                            <p className="card-text">
                                Thriller
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={study} alt="Card image cap" style={{height:"17rem"}}/>
                        <div className="card-body">
                            <p className="card-text">
                                Study Materials
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={selfhelp} alt="Card image cap" style={{height:"17rem"}} />
                        <div className="card-body">
                            <p className="card-text">
                                Self-help
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
