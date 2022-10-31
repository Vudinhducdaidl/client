import React, { useState, useContext } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Changepass() {
  const state = useContext(GlobalState)
  const [users] = state.userAPI.users
  const [token] = state.token
  const history = useNavigate()
  const [changePass, setChangePass] = useState('')

  const handleChangeInput = e => {
    const { name, value } = e.target
    setChangePass({ ...changePass, [name]: value })
    // console.log("test", changePass)
  }
  const changepasss = async e => {
    e.preventDefault()
    if (changePass.password !== changePass.passwordnewcf) {
      if (changePass.passwordnew === changePass.passwordnewcf) {
        try {
          const res = await axios.put(`/user/updatepassword/${users._id}`, { ...changePass }, {
            headers: { Authorization: token }
          })
          toast.success(res.data.msg)
          history(`/profile/${users._id}`)
          setChangePass('')
        } catch (err) {
          toast.error(err.response.data.msg)
        }
      } else {
        toast.error("Mật khẩu mới không giống nhau")
      }
    } else {
      toast.error("Mật khẩu cũ và mới không được giống nhau")
    }


  }
  return (
    <div className="login-page">
      <form onSubmit={changepasss}>
        <h2>Đổi mật khẩu</h2>
        <input type="password" name="password" required placeholder="Mật khẩu cũ"
          value={changePass.password} onChange={handleChangeInput} />
        <input type="password" name="passwordnew" required placeholder="Mật khẩu mới"
          value={changePass.passwordnew} onChange={handleChangeInput}
        />
        <input type="password" name="passwordnewcf" required placeholder="Nhập lại mật khẩu mới"
          value={changePass.passwordnewcf} onChange={handleChangeInput} />
        <div className="row">
          <button type="submit" >Lưu</button>
        </div>
      </form>
    </div>
  )

}
export default Changepass
