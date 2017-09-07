var $programmingLanguageList = $('#programming-language-list');
var $frameworkList = $('#framework-library-list');
var $softwareList = $('#runtime-software-list');

function skillItemTemplate(skillTitle, skillLevel) {
  var beginning = '<div class="flex-container">' +
    '<div class="skill-title">' +
    '<h3>' + skillTitle + '</h3>' +
    '</div>' +
    '<div class="skill-level">' +
    '<ul>';

  var listElements = [];
  for (var i = 0; i < skillLevel; i++) {
    listElements.push('<li class="active"></li>');

    if (i > 0) {
      listElements[i - 1] = '<li class="active color"></li>';
    }
  }
  for (var i = skillLevel; i < 4; i++) {
    listElements.push('<li></li>');
  }

  if (skillLevel === 4) {
    listElements[3] = '<li class="active color"></li>';
  }

  var end = '</ul>' + '</div>' + '</div>';

  return beginning + listElements.join('') + end;
}

/*** Programming Language List ***/
var programmingLanguageList = [
  {
    title: 'JavaScript',
    level: 4
  },
  {
    title: 'TypeScript',
    level: 3
  },
  {
    title: 'Java',
    level: 4
  },
  {
    title: 'Python',
    level: 2
  },
  {
    title: 'Go',
    level: 2
  },
  {
    title: 'Swift',
    level: 3
  },
  {
    title: 'Objective-C',
    level: 1
  },
  {
    title: 'C/C++',
    level: 1
  },
  {
    title: 'Ruby',
    level: 2
  },
  {
    title: 'PHP',
    level: 2
  },
  {
    title: 'R',
    level: 1
  },
  {
    title: 'Bash Scripting',
    level: 2
  }
];
/*** END Programming Language List ***/

/*** Framework/Library List ***/
var frameworkList = [
  {
    title: 'Angular (v2+)',
    level: 3
  },
  {
    title: 'AngularJS',
    level: 2
  },
  {
    title: 'VueJS',
    level: 1
  },
  {
    title: 'RxJS',
    level: 3
  },
  {
    title: 'ExpressJS',
    level: 2
  },
  {
    title: 'Spring Boot',
    level: 4
  },
  {
    title: 'Spring Framework',
    level: 3
  },
  {
    title: 'GraphQL',
    level: 2
  }
];
/*** END Framework/Library List ***/

/*** Runtime/Software List ***/
var softwareList = [
  {
    title: 'NodeJS',
    level: 3
  },
  {
    title: 'PostgreSQL',
    level: 3
  },
  {
    title: 'MongoDB',
    level: 2
  },
  {
    title: 'ElasticSearch',
    level: 3
  },
  {
    title: 'Redis',
    level: 2
  },
  {
    title: 'Figma',
    level: 2
  },
  {
    title: 'pfSense',
    level: 3
  },
  {
    title: 'Unix Terminal',
    level: 3
  },
  {
    title: 'Adobe Photoshop CC',
    level: 3
  },
  {
    title: 'Adobe Illustrator CC',
    level: 2
  }
];
/*** END Runtime/Software List ***/

programmingLanguageList.forEach(function (skill) {
  $programmingLanguageList.append(skillItemTemplate(skill.title, skill.level));
});
frameworkList.forEach(function (skill) {
  $frameworkList.append(skillItemTemplate(skill.title, skill.level));
});
softwareList.forEach(function (skill) {
  $softwareList.append(skillItemTemplate(skill.title, skill.level));
});
