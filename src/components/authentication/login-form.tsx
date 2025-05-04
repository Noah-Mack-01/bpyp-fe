import { AuthenticationContext, Credentials } from "@/src/data/auth";
import { useAuth } from "@/src/providers/auth.provider";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import { View, Text} from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import * as Yup from 'yup';

const LOGIN_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Password must contain at least one uppercase letter and one special character')
    .required('Password is required'),
  email: Yup.string().email('Must be a valid email address').required('Email is required'),
});

export function LoginForm(props: { register?: boolean}) {
  const authContext: AuthenticationContext = useAuth();
  const invoke: (creds: Credentials)=> void = props.register ? authContext.register : authContext.login; 
  const router = useRouter()
  // Redirect to root when session is updated
  useEffect(() => {
    if (authContext.session) {
      router.replace('/'); // Redirect to root
    }
  }, [authContext.session, router]);

  return (
    <Formik
      initialValues={{ password: '', email: '' }}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={(values, actions) => {
        invoke({email: values.email, password: values.password});
        actions.setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={{ padding: 16 }}>
          {/* Email Input */}
          <TextInput
            label="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            error={touched.email && !!errors.email}
          />
          <HelperText type="error" visible={touched.email && !!errors.email}>
            {errors.email}
          </HelperText>

          {/* Password Input */}
          <TextInput
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            autoCapitalize="none"
            error={touched.password && !!errors.password}
          />
          <HelperText type="error" visible={touched.password && !!errors.password}>
            {errors.password}
          </HelperText>

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit as any}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={{ marginTop: 16 }}
          >
            Login
          </Button>
          <Link href="/register"><Text>Sign up</Text></Link>
        </View>
      )}
    </Formik>
  );
}