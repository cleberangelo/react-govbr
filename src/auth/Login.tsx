import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthRequest } from "../model/auth-request.model";
import { AuthService as service } from '../service/auth.service';
import { Input } from "../component/input/Input";
import { Button } from "../component/button/Button";

export const Login = () => {
  const { setCurrentUser }: any = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<AuthRequest>({ mode: "onChange" });

  const onSubmit: SubmitHandler<AuthRequest> = async (data) => {
    service.login(data).then(_resp => {
      setCurrentUser(_resp);
      navigate('/home');
      window.location.reload();
    }, _error => console.error(_error));
  }
  return (
    <>
      <div className="row">
        <div className="col-sm-2 col-md-4 col-lg-5"></div>
        <div className="col-sm-8 col-md-4 col-lg-2">
          <img className="my-6" src="/img/govbr-logo-large.png" alt="" />
        </div>
        <div className="col-sm-2 col-md-4 col-lg-5"></div>
      </div>

      <div className="row">
        <div className="col-sm-2 col-md-4 col-lg-5"></div>

        <div className="col-sm-8 col-md-4 col-lg-2">
          <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
              control={control}
              name="username"
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Usuário"
                  onChange={onChange}
                  value={value}
                  status={errors.username ? 'danger' : undefined}
                  feedback={errors.username ? 'Campo obrigatório' : ''}
                />
              )}
            />

            <br />
            <Controller
              control={control}
              name="password"
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type='password'
                  label="Senha"
                  onChange={onChange}
                  value={value}
                  status={errors.password ? 'danger' : undefined}
                  feedback={errors.password ? 'Campo obrigatório' : ''}
                />
              )}
            />

            <br />
            <div className="row">
              <div className="col d-flex justify-content-end">
                <Button type="submit" style="primary" text="Login" icon="arrow-right-to-bracket" />
              </div>
            </div>
          </form>
        </div>

        <div className="col-sm-2 col-md-4 col-lg-5"></div>
      </div>
    </ >
  );
}