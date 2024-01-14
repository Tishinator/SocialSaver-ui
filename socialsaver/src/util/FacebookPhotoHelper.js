
class FacebookPhotoHelper {
    static async apiCall(url, params) {
        return new Promise((resolve, reject) => {
            window.FB.api(url, 'GET', params, response => {
                if (response && !response.error) {
                    resolve(response);
                } else {
                    reject(response.error);
                }
            });
        });
    }

    static async fetchAllPhotos(url, type) {
        let allPhotos = [];
        let hasNextPage = true;

        while (hasNextPage) {
            try {
                const response = await FacebookPhotoHelper.apiCall(url, { type: type, fields: 'id,name,link,picture,images' });
                allPhotos = allPhotos.concat(response.data);

                if (response.paging && response.paging.next) {
                    url = response.paging.next;
                } else {
                    hasNextPage = false;
                }
            } catch (error) {
                console.error(`Error fetching ${type} photos:`, error);
                throw new Error(`Error fetching ${type} photos: ${error.message}`);
            }
        }

        return FacebookPhotoHelper.transformApiResponseToImages(allPhotos);
    }

    static async getTagged() {
        return FacebookPhotoHelper.fetchAllPhotos('/me/photos?type=tagged', 'tagged');
    }

    static async getYourPhotos() {
        return FacebookPhotoHelper.fetchAllPhotos('/me/photos?type=uploaded', 'uploaded');
    }

    static async getAlbumPhotos() {
        try {
            let albums = await FacebookPhotoHelper.fetchAllAlbums();
            let allPhotos = [];

            for (let album of albums) {
                const albumPhotos = await FacebookPhotoHelper.fetchAllPhotos(`/${album.id}/photos`, 'album');
                allPhotos = allPhotos.concat(albumPhotos);
            }

            return allPhotos;
        } catch (error) {
            console.error('Error fetching album photos:', error);
            throw new Error('Error fetching album photos:', error.message);
        }
    }

    static async fetchAllAlbums() {
        let albums = [];
        let hasNextPage = true;
        let url = '/me/albums';

        while (hasNextPage) {
            try {
                const response = await FacebookPhotoHelper.apiCall(url, { fields: 'id,name,created_time' });
                albums = albums.concat(response.data);

                if (response.paging && response.paging.next) {
                    url = response.paging.next;
                } else {
                    hasNextPage = false;
                }
            } catch (error) {
                console.error('Error fetching albums:', error);
                throw new Error('Error fetching albums:', error.message);
            }
        }

        return albums;
    }

    static transformApiResponseToImages(responseData) {
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
}

export default FacebookPhotoHelper;
