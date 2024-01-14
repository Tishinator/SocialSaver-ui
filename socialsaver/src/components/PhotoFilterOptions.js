import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faCamera, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import './css/PhotoFilterOptions.css';

function PhotoFilterOptions() {

    return (
        <div className="photo-group-container">
            <div className="photo-options-grid">
                <div className="photo-option" onClick={getTagged}>
                    <FontAwesomeIcon icon={faUserTag} className="icon-size" />
                    <p className="option-title">Photos of You</p>
                </div>
                <div className="photo-option" onClick={getYourPhotos}>
                    <FontAwesomeIcon icon={faCamera} className="icon-size" />
                    <p className="option-title">Your photos</p>
                </div>
                <div className="photo-option" onClick={getAlbumPhotos}>
                    <FontAwesomeIcon icon={faPhotoVideo} className="icon-size" />
                    <p className="option-title">Albums</p>
                </div>
            </div>
        </div>
    );
}

export default PhotoFilterOptions;
