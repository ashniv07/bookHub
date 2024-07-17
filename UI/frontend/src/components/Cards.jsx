import React from 'react';
import fantasy from '../assets/fantasy.jfif';
import horror from '../assets/horror.jpg';
import scifi from '../assets/sci-fi.jpg';

const Cards = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={fantasy} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 1, Column 1
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={horror} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 1, Column 2
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={scifi} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 1, Column 3
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={scifi} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 1, Column 4
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={fantasy} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 2, Column 1
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={horror} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 2, Column 2
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={scifi} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 2, Column 3
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={scifi} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">
                                Row 2, Column 4
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
