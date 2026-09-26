function App() {
  const course = { 
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ],
    coursetotal: function() {
      return this.parts.reduce((total, part) => total + part.exercises, 0)
    }
   }


  const Content = (props) => {
    const { parts } = props.course
    return (
      <div>
        {parts.map((course) => (
          <p key={course.name}>
            {course.name} {course.exercises}
          </p>
        ))}
      </div>
    )
  }

  const Footer = (props) => {
    const { total } = props.course.coursetotal()
    return <p>Number of exercises {total}</p>
  }

  return (
     <div>
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />
    </div>
  )
}

export default App
