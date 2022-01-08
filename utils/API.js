import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_PATH = "http://hackathon.kazandirio.io/v1"
const STORAGE_SESSION_PATH = 'kazandirio/currentSessionId';
const STORAGE_REFRESH_PATH = 'kazandirio/currentRefreshTokenId';
const STORAGE_USER_PATH = 'kazandirio/currentUser';

const API = {
	_storage: {
		getItem: AsyncStorage.getItem,
		setItem: AsyncStorage.setItem,
		removeItem: AsyncStorage.removeItem,
	},

    /*_fakeStorage: {},

    _storage: {
        getItem: async (key) => {
            if(this._fakeStorage.hasOwnProperty(key)){
                return this._fakeStorage[key];
            } else {
                return null;
            }
        },
        setItem: async (key, value) => { 
            this._fakeStorage[key] = value;
            return true;
        },
        removeItem: async (key) => {
            if(this._fakeStorage.hasOwnProperty(key)){
                delete this._fakeStorage[key];
            }
            return true;
        },
    },*/

	/*--------- BASE REQUEST FUNCTION ------------*/
	makeHttpRequest: function(relativePath, method, params = null) {
		return Promise.all([
			this.getCurrentSessionId()
		]).then(([sessionId]) => {
			if (params === undefined || params === null || (typeof params) !== 'object') {
				params = null;
			}
			let fetchOptions = {
				method: method,
				headers: {
					'Accept': 'application/json',
				}
			};
			if (sessionId) {
				fetchOptions.headers['Authorization'] = 'Bearer ' + sessionId;
			}
			// GET requests do not use body, so we do not add Content-Type header or body to the request
			if (method !== 'GET') {
				fetchOptions.headers['Content-Type'] = 'application/json';
				if (params) {
					fetchOptions.body = JSON.stringify(params);
				} else {
					fetchOptions.body = '{}';
				}
			}

			if (relativePath.substr(0, 1) === '/') {
				relativePath = relativePath.substr(1, relativePath.length);
			}

			return fetch(BASE_PATH + '/' + relativePath, fetchOptions)
				.then((response) => { //this then includes catch as well.
					if (response.status < 400) {
                        return response.json()
                            .then((body) => {
                                return Promise.resolve(body.body);
                            })
                            .catch(() => {
                                return this.throwServerError();
                            });
					} else {
						if (response.headers && typeof response.headers.get('Content-Type') === 'string' && response.headers.get('Content-Type').includes('application/json')) {
							return response.json()
								.then((body, error) => { // this then includes catch as well.
									if (error) {
										return this.throwServerError();
									} else {
										return Promise.reject(body.header);
									}
								})
						} else {
							return this.throwServerError();
						}
					}
				})
				.catch((body) => {
					if(!body.header || !body.header.message){
							return this.throwServerError();
					} else {
							return Promise.reject(error);
					}
				})
		})
	},


	/*--------- LOCAL SESSION ----------*/
	getCurrentSessionId: function() {
		return this._storage.getItem(STORAGE_SESSION_PATH)
	},
	setCurrentSessionId: function(id) {
		if ((typeof id) !== 'string' || id.length === 0) {
			return this._storage.removeItem(STORAGE_SESSION_PATH)
				.then(() => {
					return Promise.resolve(true);
				})
		} else {
			return this._storage.setItem(STORAGE_SESSION_PATH, id)
				.then((val) => {
					return Promise.resolve(val);
				})
		}
	},

	throwServerError: function() {
        return Promise.reject({
            header: {
                isSuccess: false,
                statusCode: 601,
                message: 'Bir bağlantı veya sunucu hatası yaşandı.',
            },
            body: {}
        });
	},

	/*--------- CURRENT USER LOCAL ----------*/
	getCurrentUser: function() {
		return this._storage.getItem(STORAGE_USER_PATH).then(val => {
			if (val) {
				return JSON.parse(val);
			} else {
				return Promise.resolve(null);
			}
		})
	},

	setCurrentUser: function(user) {
		if (user) {
			return this._storage.setItem(STORAGE_USER_PATH, JSON.stringify(user))
				.then((val) => {
					return Promise.resolve(val);
				})
		} else {
			return this._storage.removeItem(STORAGE_USER_PATH)
				.then(() => {
					return Promise.resolve(true);
				})
		}
	},

	/*----------------- AUTHENTICATION / USER -----------------*/
	submitPhoneNumber: function(phoneNumber) {
		let params = {
			phoneNumber
		}

		return this.makeHttpRequest('/auth/login', 'POST', params);
	},
	submitValidationCode: function(phoneNumber, validationCode) {
        let params = {
            phoneNumber, validationCode
        }

		return this.makeHttpRequest('/auth/login/validate', 'POST', params)
            .then(body => {
				return Promise.all([this.setCurrentSessionId(body.token), this.getCurrentUserFromServer()]) 
                    .then(() => {
                        return Promise.resolve(body);
                    });
            });
	},
	logout: function() {
        return Promise.all([
            this.setCurrentUser(null),
            this.setCurrentSessionId(null),
            this._storage.removeItem(STORAGE_REFRESH_PATH)
        ]);
	},
	getCurrentUserFromServer: function() {
			return this.makeHttpRequest('/auth/profile', 'GET')
					.then((body)=>{
							return this.setCurrentUser(body);
					})
	},
	getCampaings: function(){
		return this.makeHttpRequest('/campaigns', 'GET');
	},
	getCampaignDetails: function(id){
		return this.makeHttpRequest(`/campaigns/${id}`, 'GET');
	},
	setProfile: function(profile){
		return this.makeHttpRequest(`/auth/profile`, 'PUT', profile);
	}
};

module.exports = API;