import React, { useContext, useEffect, useState } from 'react';
// import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import imgDefault from '../image/default.jpg';

function Profile() {
  const state = useContext(GlobalState);
  const param = useParams();
  console.log(param)
  // const [users, setUsers] = state.userAPI.users;
  const [users] = state.userAPI.users;
  const [profile, setProfile] = useState(false);



  // console.log("profile", profile)

  useEffect(() => {

    console.log(param.id)
    if (param.id) {

      console.log("user nè", users._id)
      if (users._id === param.id) {

        setProfile(users);
      } else {
        setProfile("");
      }
    }
  }, [param.id, users])
  return (
    <>
      <div className="w-4/5 mx-auto mt-8 mb-4">
        <h1 className="font-bold text-[2rem]">Profile</h1>
        <hr />

        <div className="my-4">
          <div className="text-xl py-2">
            <img
              src={profile.images !== undefined ? profile.images.url : imgDefault}
              alt=""
            />
          </div>
          <div className="text-xl py-2">
            <span className="mr-2 uppercase">Tên người dùng:</span>
            <span>{profile.name}</span>
          </div>
          <div className="text-xl py-2">
            <span className="mr-2 uppercase">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="text-xl py-2">
            <span className="mr-2 uppercase">SĐT:</span>
            <span>{profile.phone}</span>
          </div>
          <div className="text-xl py-2">
            <span className="mr-2 uppercase">Địa chỉ:</span>
            <span>
              {profile.address !== undefined ? profile.address : 'Chưa có địa chỉ'}
            </span>
          </div>
        </div>
        <div className="flex">
          <Link
            to={`/changeprofile/${users._id}`}
            users={users}
            className="w-fit"
          >
            <p className="uppercase py-2 px-4 mr-4 text-white bg-blue-400 hover:bg-blue-600">
              Sửa hồ sơ
            </p>
          </Link>

          <Link to={`/changepassword/${users._id}`} className="w-fit">
            <p className="uppercase py-2 px-4 text-white bg-blue-400 hover:bg-blue-600">
              Đổi mật khẩu
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
