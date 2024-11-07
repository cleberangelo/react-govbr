import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="row template-erro">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <div className="mt-4 mt-sm-0"><img src="/img/404.png" alt="erro 404" /></div>
        </div>
        <div className="col text-center text-sm-left">
          <div className="text-support-03">
            <p className="text-up-06 text-semi-bold my-3">
              Estamos constrangidos em te ver por aqui</p>
          </div>
          <div className="text-secondary-06">
            <p className="text-up-03 text-medium my-3">
              Mas, podemos ajudá-lo a encontrar o que está procurando de outra forma</p>
          </div>
          <p className="my-3">
            Talvez você tenha se equivocado ao digitar o endereço URL ou quem sabe nós tenhamos cometido uma falha por aqui. Se possível, relate o erro para
            que possamos sempre estar melhorando.
          </p>
        </div>
      </div>
      <div className="row my-5 text-center justify-content-lg-center">
        <div className="col-12 col-md-auto mt-1 mt-lg-0">

          <button className="br-button primary" type="button" onClick={() => navigate('/home')}>
            <i className="fas fa-home" aria-hidden="true"></i>
            Ir para Página Principal
          </button>

        </div>
      </div>
    </>
  );
}