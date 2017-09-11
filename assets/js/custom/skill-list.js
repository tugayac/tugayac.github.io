var $programmingLanguageList = $('#programming-language-list > .flex-container');
var $frameworkList = $('#framework-library-list > .flex-container');
var $softwareList = $('#runtime-software-list > .flex-container');

function skillItemTemplate(skillTitle, skillLevel) {
  var beginning = '<div class="skill-container">' +
    '<div class="skill-title">' +
    '<h3>' + skillTitle + '</h3>' +
    '</div>' +
    '<div class="skill-level">';

  beginning += '<div class="signal-bar beginner ' + (skillLevel >= 1 ? 'active' : '') + '"></div>'
  beginning += '<div class="signal-bar intermediate ' + (skillLevel >= 2 ? 'active' : '') + '"></div>'
  beginning += '<div class="signal-bar advanced ' + (skillLevel >= 3 ? 'active' : '') + '"></div>'
  beginning += '<div class="signal-bar master ' + (skillLevel === 4 ? 'active' : '') + '"></div>'

  var end = '</div>';

  return $(beginning + end);
}

/*** Programming Language List ***/
var programmingLanguageList = [
  {
    title: 'JavaScript',
    level: 4,
    categories: ['web-dev', 'server']
  },
  {
    title: 'TypeScript',
    level: 3,
    categories: ['web-dev']
  },
  {
    title: 'Java',
    level: 4,
    categories: ['web-dev', 'server']
  },
  {
    title: 'Python',
    level: 2,
    categories: ['data-science']
  },
  {
    title: 'Go',
    level: 2,
    categories: ['web-dev', 'server', 'networking']
  },
  {
    title: 'Swift',
    level: 3,
    categories: ['ios']
  },
  {
    title: 'Objective-C',
    level: 1,
    categories: ['ios']
  },
  {
    title: 'C/C++',
    level: 1
  },
  {
    title: 'Ruby',
    level: 2,
    categories: ['web-dev']
  },
  {
    title: 'PHP',
    level: 2,
    categories: ['web-dev']
  },
  {
    title: 'R',
    level: 1,
    categories: ['data-science']
  },
  {
    title: 'Bash Scripting',
    level: 2,
    categories: ['networking']
  }
];
/*** END Programming Language List ***/

/*** Framework/Library List ***/
var frameworkList = [
  {
    title: 'Angular (v2+)',
    level: 3,
    categories: ['web-dev']
  },
  {
    title: 'AngularJS',
    level: 2,
    categories: ['web-dev']
  },
  {
    title: 'VueJS',
    level: 1,
    categories: ['web-dev']
  },
  {
    title: 'RxJS',
    level: 3,
    categories: ['web-dev', 'server']
  },
  {
    title: 'ExpressJS',
    level: 2,
    categories: ['web-dev', 'server']
  },
  {
    title: 'Spring Boot',
    level: 4,
    categories: ['web-dev', 'server']
  },
  {
    title: 'Spring Framework',
    level: 3,
    categories: ['web-dev', 'server']
  },
  {
    title: 'GraphQL',
    level: 2,
    categories: ['web-dev', 'ios', 'server']
  }
];
/*** END Framework/Library List ***/

/*** Runtime/Software List ***/
var softwareList = [
  {
    title: 'NodeJS',
    level: 3,
    categories: ['web-dev', 'server']
  },
  {
    title: 'PostgreSQL',
    level: 3,
    categories: ['web-dev', 'databases']
  },
  {
    title: 'MongoDB',
    level: 2,
    categories: ['web-dev', 'databases']
  },
  {
    title: 'ElasticSearch',
    level: 3,
    categories: ['web-dev', 'databases']
  },
  {
    title: 'Redis',
    level: 2,
    categories: ['web-dev', 'databases']
  },
  {
    title: 'Figma',
    level: 2,
    categories: ['ios']
  },
  {
    title: 'Docker',
    level: 3,
    categories: ['web-dev', 'server']
  },
  {
    title: 'pfSense',
    level: 3,
    categories: ['server', 'networking']
  },
  {
    title: 'Unix Terminal',
    level: 3,
    categories: ['server', 'networking']
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

var sortBySkillLevel = function (a, b) {
  return b.level - a.level;
}

/*** Sorting and Creating ***/
programmingLanguageList.sort(sortBySkillLevel);
frameworkList.sort(sortBySkillLevel);
softwareList.sort(sortBySkillLevel);

programmingLanguageList.forEach(function (skill) {
  skill.$dom = skillItemTemplate(skill.title, skill.level);
  $programmingLanguageList.append(skill.$dom);
});
frameworkList.forEach(function (skill) {
  skill.$dom = skillItemTemplate(skill.title, skill.level);
  $frameworkList.append(skill.$dom);
});
softwareList.forEach(function (skill) {
  skill.$dom = skillItemTemplate(skill.title, skill.level);
  $softwareList.append(skill.$dom);
});

/*** Tag Filtering ***/
var setDisplayPropertyNone = function (skill) {
  if (skill.$dom.css('display') !== 'none') {
    skill.$displayValue = skill.$dom.css('display');
    skill.$dom.css('display', 'none');
  }
};

var forEachSkill = function (skill) {
  if (skill.categories) {
    if (skill.categories.length === 0 || skill.categories.indexOf(event.target.id) === -1) {
      setDisplayPropertyNone(skill);
    } else {
      skill.$dom.css('display', skill.$displayValue);
    }
  } else {
    setDisplayPropertyNone(skill);
  }
};

var resetEachSkill = function (skill) {
  if (skill.$dom.css('display') === 'none') {
    skill.$dom.css('display', skill.$displayValue);
  }
};

var currentlySelectedTag;
var tagClickEventHandler = function (event) {
  if (currentlySelectedTag) {
    currentlySelectedTag.removeClass('selected');
  }

  if (currentlySelectedTag && currentlySelectedTag.eq(0).attr('id') === event.currentTarget.id) {
    currentlySelectedTag = undefined;

    programmingLanguageList.forEach(resetEachSkill);
    frameworkList.forEach(resetEachSkill);
    softwareList.forEach(resetEachSkill);
  } else {
    currentlySelectedTag = event.data.element;
    currentlySelectedTag.addClass('selected');

    programmingLanguageList.forEach(forEachSkill);
    frameworkList.forEach(forEachSkill);
    softwareList.forEach(forEachSkill);
  }
};

var tagButtons = $('#tags > .tag-buttons > .btn');
tagButtons.each(function () {
  var element = $(this);
  element.on('click', { element: element }, tagClickEventHandler);
});
