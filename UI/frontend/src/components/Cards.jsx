// import { useNavigate } from 'react-router-dom';
// import fantasy from '../assets/fantasy.jpg';
// import horror from '../assets/horror.jpg';
// import scifi from '../assets/sci-fi.jpg';
// import romance from '../assets/romance.jpg';
// import comic from '../assets/comic.jpg';
// import selfhelp from '../assets/selfhelp.jpg';
// import study from '../assets/study.jpg';
// import thriller from '../assets/Thriller.jfif';

// const genreImages = {
//     Fantasy: fantasy,
//     Horror: horror,
//     "Science Fiction": scifi,
//     Comics: comic,
//     Romance: romance,
//     Thriller: thriller,
//     "Study Materials": study,
//     "Self-help": selfhelp,
// };

// const Cards = () => {
//     const navigate = useNavigate();
//     const genres = ['Fantasy', 'Horror', 'Science Fiction', 'Comics', 'Romance', 'Thriller', 'Study Materials', 'Self-help'];

//     const handleCardClick = (genre) => {
//         navigate(`/genre/${genre}`);
//     };

//     return (
//         <div className="container" style={{ marginTop: '100px' }}>
//             <div className="row">
//                 {genres.map((genre) => (
//                     <div className="col-md-3" key={genre}>
//                         <div className="card" onClick={() => handleCardClick(genre)} style={{ width: "18rem" }}>
//                             <img className="card-img-top" src={genreImages[genre]} alt={`Card image for ${genre}`} style={{ height: "17rem" }} />
//                             <div className="card-body">
//                                 <p className="card-text">{genre}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

        
//     );
// };

// export default Cards;

import { useNavigate } from 'react-router-dom';

import fantasy from '../assets/fantasy.jpg';
import horror from '../assets/horror.jpg';
import scifi from '../assets/sci-fi.jpg';
import romance from '../assets/romance.jpg';
import comic from '../assets/comic.jpg';
import selfhelp from '../assets/selfhelp.jpg';
import study from '../assets/study.jpg';
import thriller from '../assets/Thriller.jfif';
import '../styles/cards.css'

const genreImages = {
    Fantasy: fantasy,
    Horror: horror,
    "Science Fiction": scifi,
    Comics: comic,
    Romance: romance,
    Thriller: thriller,
    "Study Materials": study,
    "Self-help": selfhelp,
};

const Cards = () => {
    const navigate = useNavigate();
    const genres = ['Fantasy', 'Horror', 'Science Fiction', 'Comics', 'Romance', 'Thriller', 'Study Materials', 'Self-help'];

    const handleCardClick = (genre) => {
        navigate(`/genre/${genre}`);
    };

    // return (
    //     <div className="container" style={{ marginTop: '100px' }}>
    //         <div className="row">
    //             {genres.map((genre) => (
    //                 <div className="col-md-4" key={genre}>
    //                     <div className="profile-card-6" onClick={() => handleCardClick(genre)} style={{ cursor: 'pointer',width:"18rem" }}>
    //                         <img src={genreImages[genre]} className="img img-responsive" alt={`Card image for ${genre}`} style={{ height: "18rem" }} />
    //                         <div className="profile-name">{genre}</div>
    //                         <div className="profile-position">Explore {genre} books</div>
                    
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row">
                {genres.map((genre) => (
                    <div className="col-md-3" key={genre}>
                        <div 
                            className="profile-card-6" 
                            onClick={() => handleCardClick(genre)} 
                            style={{ cursor: 'pointer', width: '17rem' }}
                        >
                            <img 
                                src={genreImages[genre]} 
                                className="img img-responsive" 
                                alt={`Card image for ${genre}`} 
                                style={{ height: '20rem' }} 
                            />
                            <div className="profile-info">
                                <div className="profile-name">{genre}</div>
                                <div className="profile-position">Explore {genre} books</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    );
};

export default Cards;
