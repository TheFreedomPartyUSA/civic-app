import courses from "../data/courses.json";

export default function Course() {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          {course.modules.map((module) => (
            <div key={module.id}>
              <h2>{module.title}</h2>

              {module.lessons.map((lesson, index) => (
                <div key={index}>
                  <h3>{lesson.title}</h3>
                  <p><strong>Explanation:</strong> {lesson.explanation}</p>
                  <p><strong>When This Applies:</strong> {lesson.when_applies}</p>
                  <p><strong>Example:</strong> {lesson.example}</p>
                  <p><strong>Risk:</strong> {lesson.risk}</p>
                  <p><strong>What You Should Do:</strong> {lesson.action}</p>
                  <p><strong>What You Can Say:</strong> "{lesson.script}"</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}