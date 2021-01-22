export default class UserInfo{
    constructor({name,description,avatar}){
        this._name = name;
        this._description = description;
        this._avatar = avatar
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
          this._avatar.src = avatarUrl;
      }
}