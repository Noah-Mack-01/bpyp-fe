import { Exercise } from "@/src/data/exercise";
import { useWindowDimensions, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { PickListOption } from "@/src/data/inputs";
import { RowToColumnView } from "../structural/views";
import { InputPickListCombo, } from "../shared/inputs";
import { Formik } from "formik";
import * as Yup from 'yup';

// Validation schema - add this for form validation
const ExerciseSchema = Yup.object().shape({
  exercise: Yup.string().required('Exercise name is required'),
  sets: Yup.number().required('Sets is required').min(1, 'Must be at least 1 set'),
  work: Yup.number().required('Quantity is required').min(0, 'Must be at least 0'),
  resistance: Yup.number().min(0, 'Must be at least 0'),
});

export const ExerciseForm = (props: { 
  exercise?: Exercise, 
  back?: ()=>void, 
  submit?:(exercise: Exercise)=>Promise<void>
}) => {
  const dimensions = useWindowDimensions()
  const inputStyle = dimensions.height < dimensions.width ? {} as any : {width: Math.min(dimensions.width, 300)}
  return (
    <Formik
      initialValues={{
        text: props.exercise?.text ?? '',
        sets: props.exercise?.sets ?? '',
        work: props.exercise?.work ?? '',
        workUnit: props.exercise?.workUnit ?? 'reps',
        resistance: props.exercise?.resistance ?? 0,
        resistanceUnits: props.exercise?.resistanceUnits ?? 'pounds',
        timeStamp: props.exercise?.timeStamp ?? new Date(),
        attributes: props.exercise?.attributes ?? [],
        exercise: props.exercise?.exercise ?? "Seated Curl"
      } as Exercise}
      validationSchema={ExerciseSchema}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        if (props.submit) {
          props.submit(values).then(()=>{
            actions.setSubmitting(false);
            actions.setTouched({});
          });
        }
        else setTimeout(() => {
          alert("No endpoint submission logic specified!");
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false); 
        }, 1000);
      }}>
      {({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched, isSubmitting }) => (
        <View style={{}}>
        <RowToColumnView style={{width: "100%", gap:10, alignItems:"flex-start", minHeight:100}}>
          <View>
          <TextInput 
            style={inputStyle} 
            mode="outlined" 
            label="Exercise"
            value={values.exercise}
            onChangeText={handleChange('exercise')}
            onBlur={handleBlur('exercise')}
            error={touched.exercise && Boolean(errors.exercise)}/>
          {touched.exercise && errors.exercise && (
            <HelperText type="error" visible>{errors.exercise}</HelperText>
          )}
          </View>
          
          <TextInput 
            style={inputStyle} 
            mode="outlined" 
            label="Sets"
            value={String(values.sets)}
            onChangeText={handleChange('sets')}
            onBlur={handleBlur('sets')}
            keyboardType="numeric"
            error={touched.sets && Boolean(errors.sets)}
          />
          {touched.sets && errors.sets && (
            <View><HelperText type="error" visible>{errors.sets}</HelperText></View>
          )}
          
          <InputPickListCombo 
            style={inputStyle} 
            options={RESISTANCE_OPTIONS} 
            label="Resistance" 
            selectLabel="Units"
            value={String(values.resistance)}
            onChangeText={handleChange('resistance')}
            onBlur={handleBlur('resistance')}
            error={touched.resistance && Boolean(errors.resistance)}
            selectedValue={values.resistanceUnits}
            onSelectChange={(value) => {
              handleChange('resistanceUnits')(value);
            }}
          />
          {touched.resistance && errors.resistance && (
              <HelperText style={{justifyContent: "flex-start", width: Math.min(300, dimensions.width)}}type="error" visible>{errors.resistance}</HelperText>
          )}
          
          <InputPickListCombo 
            style={inputStyle} 
            options={QUANTITY_OPTIONS} 
            label="Quantity / Distance" 
            selectLabel="Units"
            value={String(values.work)}
            onChangeText={handleChange('work')}
            onBlur={handleBlur('work')}
            error={touched.work && Boolean(errors.work)}
            selectedValue={values.workUnit}
            onSelectChange={(value) => {
              handleChange('workUnit')(value);
            }}
          />
          {touched.work && errors.work && (
              <HelperText style={{justifyContent: "flex-start", width: Math.min(300, dimensions.width)}}type="error" visible>{errors.work}</HelperText>
          )}
          
          {isAerobic(props.exercise) && (
            <InputPickListCombo 
              style={inputStyle} 
              options={DURATION_OPTIONS} 
              label="Duration" 
              selectLabel="Units"
              // Assuming you have duration and durationUnit fields in your Exercise type
              // If not, you'll need to add them to your Exercise type
              value={values.duration ? String(values.duration) : ''}
              onChangeText={handleChange('duration')}
              onBlur={handleBlur('duration')}
              selectedValue={values.durationUnits}
              onSelectChange={(value) => {
                handleChange('durationUnit')(value);
              }}
            />
          )}        
          </RowToColumnView>
          <View style={{ minWidth: Math.min(dimensions.width > dimensions.height ? 350 : 300, dimensions.width), maxWidth:Math.min(dimensions.width > dimensions.height ? 350 : 300, dimensions.width), flexDirection: "row", justifyContent:"center", gap: 10}}>
            {props.back && <Button style={{flex:1}} icon="arrow-left" onPress={props.back} mode="contained-tonal">Back</Button>}
            <Button 
              style={{flex:1}} 
              mode="contained" 
              onPress={()=>handleSubmit()} 
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit
            </Button>
            <Button 
              style={{flex:1}} 
              icon="arrow-u-right-bottom" 
              onPress={()=>handleReset()} 
              mode="contained-tonal"
            >
              Reset
            </Button>
          </View></View>
      )}
    </Formik>
  );
}

function isAerobic(exercise?: Exercise):boolean { return false;}

const helperTextStyle: any = {}

const DURATION_OPTIONS = [
  { label: 'mins', value: 'minutes', default: true},
  { label: 'hours', value: 'hours', default: false},
  { label: 'seconds', value: 'seconds', default: false}
]

const RESISTANCE_OPTIONS: PickListOption[] = [
  { label: 'kg', value: 'kg', default: false},
  { label: 'lbs', value: 'pounds', default: true }
]

const QUANTITY_OPTIONS: PickListOption[] = [
  {label: 'reps', value: 'reps', default: true},
  {label: 'miles', value: 'miles', default: false},
  {label: 'steps', value: 'steps', default: false},
  {label: 'km', value: 'km', default: false},
]