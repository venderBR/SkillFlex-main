import "./style.css";
import { Link } from "react-router-dom";
function SelectPage() {
  return (
      <div className="selectPage">
        <div className="container">
          <div className="card">
            <div className="imBx">
              <img src="https://i.pinimg.com/564x/99/37/44/993744d2941e55d52fa28cdc2ff714ce.jpg" alt="Admin" />
            </div>
            <div className="content">
              <h2 className="admin">ADMIN</h2>
              <div className="text">Do you want to log in as Admin?</div>
              <div>คุณต้องการเข้าสู่ระบบในฐานะ Admin ของเราใช่หรือไม่</div>
              <Link className="yesA" to="/LoginAdmin">CONFIRM</Link>
            </div>
          </div>
          <div className="card">
            <div className="imBx">
              <img src="https://i.pinimg.com/564x/ce/57/82/ce57824d38e7921c16e0c621c13fedd6.jpg" alt="Student" />
            </div>
            <div className="content">
              <h2 className="student">STUDENT</h2>
              <div className="text">Do you want to log in as Student?</div>
              <div>คุณต้องการเข้าสู่ระบบในฐานะ Student ของเราใช่หรือไม่</div>
              <Link className="yesS" to="/LoginStudent">CONFIRM</Link>
            </div>
          </div>
          <div className="card">
            <div className="imBx">
              <img src="https://i.pinimg.com/564x/bf/98/3f/bf983f80a5b285ab2907f335eea5ec0d.jpg" alt="Teacher" />
            </div>
            <div className="content">
              <h2 className="teacher">TEACHER</h2>
              <div className="text">Do you want to log in as Teacher?</div>
              <div>คุณต้องการเข้าสู่ระบบในฐานะ Teacher ของเราใช่หรือไม่</div>
              <Link className="yesT" to="/LoginTeacher">CONFIRM</Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SelectPage;
