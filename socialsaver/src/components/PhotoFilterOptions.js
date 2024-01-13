import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faCamera, faPhotoVideo, faImages } from '@fortawesome/free-solid-svg-icons';
import './css/PhotoFilterOptions.css';

function PhotoFilterOptions({taggedPhotos, yourPhotos, handleTaggedPhotos, handleYourPhotos}) {


    function fetchAllPhotos(type) {
        let allPhotos = [];
    
        function fetchPhotos(url) {
            window.FB.api(
                url,
                'GET',
                { type: type, fields: 'id,name,link,picture,images' },
                function(response) {
                    if (response && !response.error) {
                        // Add photos to our list
                        allPhotos = allPhotos.concat(response.data);
                        if (response.paging && response.paging.next) {
                            // The next URL is a full URL, so we extract the path and query
                            fetchPhotos(response.paging.next);
                        } else {
                            // Handle the complete set of photos
                            console.log('Retrieved all photos:', allPhotos);
                            const formattedPhotos = transformApiResponseToImages(allPhotos);
                            if (type.startsWith("tagged")){
                                handleTaggedPhotos(formattedPhotos);
                            }
                            else if(type.startsWith("uploaded")){
                                handleYourPhotos(formattedPhotos);
                            }
                        }
                    } else {
                        console.error('Error fetching ' + type+ ' photos', response.error);
                        alert('Error fetching ' + type+ ' photos', response.error)
                    }
                }
            );
        }
    
        fetchPhotos('/me/photos');
    }


    function getTagged(){
        if(taggedPhotos.length > 0){
            handleTaggedPhotos(taggedPhotos);
        }else{
            fetchAllPhotos("tagged");
        }
    }

    function getYourPhotos(){
        if(yourPhotos.length > 0){
            handleYourPhotos(yourPhotos);
        }else{
            fetchAllPhotos("uploaded");
        }
    }

    function transformApiResponseToImages(responseData) {
        return responseData.map(photo => {
            const largestImage = photo.images[0]; // Assuming the first image is the largest
            return {
                src: largestImage.source,
                width: largestImage.width,
                height: largestImage.height,
                caption: photo.name
            };
        });
    }
    

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
                <div className="photo-option">
                    <FontAwesomeIcon icon={faPhotoVideo} className="icon-size" />
                    <p className="option-title">Albums</p>
                </div>
            </div>
        </div>
    );
}

export default PhotoFilterOptions;
