import { RECURSIVE_CONTAINER_PROPS } from "./model";
import { Field } from "./components";
// import classes from 'assets/scss/recursive-container.module.scss';

export const RecursiveContainer: React.FC<RECURSIVE_CONTAINER_PROPS> = (
  props
) => {
  let {
    config,
    formik,
    validationSchema,
    formContainerProps,
    formContainer: FormContainer = null,
  } = props;

  // To understand the formContainer prop
  // formContainer = {
  //   component: ExampleComponent, // this prop is a component that is used to wrap the recursivecontainer form within it. (like shown below in the return statement)
  //   props: exampleProps
  // }
  if (config) config = config.filter((el) => el);
  const formElements = (
    <>
      {config.map((c, index) => {
        const formElement = (
          <Field
            fullWidth
            margin="normal"
            {...c}
            // className={[classes["field-container"], c.className]
            //   .filter((el) => el)
            //   .join(" ")}
            formik={formik}
            validationSchema={validationSchema}
            key={index}
          />
        );
        const Container = c["container"];
        return Container ? <Container>{formElement}</Container> : formElement;
      })}
    </>
  );
  const recursiveContainer = FormContainer ? (
    formElements
  ) : (
    <div
      {...formContainerProps}
      // style={{
      //   display: 'flex',
      //   flexDirection: 'row',
      //   flexWrap: 'wrap',
      //   gap: 10,
      //   ...formContainerProps?.style
      // }}
    >
      {formElements}
    </div>
  );

  return FormContainer ? (
    <FormContainer
      {...formContainerProps}
      // children={} // recursiveContainer form is given to use your own styles and functionalities by wrapping it inside your own elements.
    >
      {recursiveContainer}
    </FormContainer>
  ) : (
    recursiveContainer
  );
};

export * from "./components";
export * from "./model";
