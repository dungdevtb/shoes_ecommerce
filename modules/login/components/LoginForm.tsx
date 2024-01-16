import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import LoaderButton from '@/common/components/button/components/LoaderButton';
import InputComponent from '@/common/components/input/components/InputComponent';
import InputPasswordComponent from '@/common/components/input/components/InputPasswordComponent';
import { LOGIN } from '@/common/graphql/mutation/LOGIN';
import { useModal } from '@/common/recoil/modal';
import { useLogin } from '@/common/recoil/user';
import IncorrectCredentials from '../modals/IncorrectCredentials';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionLogin } from '@/pages/redux/actions/auth.action';

const RegistrationForm = () => {
  const { mutate } = useApolloClient();
  const { handleLogin } = useLogin();
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();
  const router = useRouter();
  let dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await actionLogin(values, dispatch)
      if (typeof res === 'string') {
        openModal(<IncorrectCredentials />);
      } else {
        router.push('/')
      }
      setLoading(false);

      // mutate<{
      //   login: {
      //     user: { username: string; email: string; id: string };
      //     jwt: string;
      //   };
      // }>({ mutation: LOGIN, variables: values })
      //   .then((res) => {
      //     if (res.data?.login)
      //       handleLogin(res.data.login.user, res.data.login.jwt);
      //     setLoading(false);
      //   })
      //   .catch(() => {
      //     openModal(<IncorrectCredentials />);
      //     setLoading(false);
      //   });
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.email) {
        errors.email = 'Required';
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email';
      }

      if (!values.password) {
        errors.password = 'Required';
      }

      return errors;
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-160 flex-col gap-1"
        onSubmit={formik.handleSubmit}
      >
        <InputComponent
          label="Email"
          placeholder="Enter your email..."
          name="email"
          handleChange={formik.handleChange}
          value={formik.values.email}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputPasswordComponent
          label="Password"
          placeholder="Enter your password..."
          name="password"
          handleChange={formik.handleChange}
          value={formik.values.password}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />

        <LoaderButton
          className="mt-1 rounded-md py-2"
          type="submit"
          loading={loading}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
