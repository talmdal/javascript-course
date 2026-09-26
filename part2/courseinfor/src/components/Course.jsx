const Header = (props) => {
  return <h3>{props.course.name}</h3>;
};

const Content = (props) => {
  const { parts } = props.course;
  return (
    <div>
    {parts.map((course) => (
        <p key={course.name}>
        {course.name} {course.exercises}
        </p>
    ))}
    </div>
  );
};

const courseTotal = (course) => {
  const { parts } = course;
  return parts.reduce((total, part) => total + part.exercises, 0)
};

const Footer = (props) => {
  const total = courseTotal(props.course)
  return <p>Total of {total} exercises</p>
};

const Course = (props) => {
  const { course } = props;
  return (
    <div>
    <Header course={course} />
    <Content course={course} />
    <Footer course={course} />
    </div>
  );
};

export default Course;