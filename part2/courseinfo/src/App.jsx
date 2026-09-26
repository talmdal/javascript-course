import Title from './components/Title.jsx';
import Course from './components/Course.jsx';

export function App() {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11,  id: 4 }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 }
      ]
    }
  ];

  return (
    <div>
      <Title title="Web development curriculum" />
      {courses.map((course) => (
        <div key={course.id}>
          <Course course={course} />
        </div>
      ))}
    </div>
  );
}

export default App;