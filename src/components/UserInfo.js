export default class UserInfo{
    constructor({name,description}){
        this._name = name;
        this._description = description;
    }
    getUserInfo() {
        const info = {
          name: this._name.textContent,
          description: this._description.textContent
        }
        return info;
      }
    
      setUserInfo(name, description) {
        this._name.textContent = name;
        this._description.textContent = description
      }
      setAvatar(avatarUrl){
          const avatar = document.querySelector('.profile__avatar');
          avatar.src = avatarUrl;
      }
}