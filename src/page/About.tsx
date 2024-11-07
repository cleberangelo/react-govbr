import { useNavigate, useLocation } from 'react-router-dom';

export const About = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>About us</h1>
          <h2>Path: {location.pathname}</h2>
          <button onClick={goBack}>Back</button>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}