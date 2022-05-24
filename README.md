# TMINE (project-management-app)

#### Команда:
1) Team lead Инга (https://github.com/rubiaqute)
2) Настя (https://github.com/batashofa?tab=repositories)
3) Эд (https://github.com/EdChekanov)

#### Deploy backend:
https://kanban-rest-api.herokuapp.com/docs/static/index.html

#### Deploy приложения TMINE:
https://rubiaqute-tmine.netlify.app/

#### Видео:
https://www.youtube.com/watch?v=z93DphGIk-A

#### Описание:
Проект разрабатывался в команде (3 участника).
Система управления проектами – это одностраничное приложение, помогающее достичь поставленные задачи отдельному человеку в команде или группе разработчиков.
Приложение имеет sticky header и footer. Таким образом с любой страницы приложения (для авторизованного пользователя) доступны кнопки создания новой борды, редактирования профиля и log out в header, а также ссылки на курс и GitHub участников команды в footer.
На главной странице приложения, которая доступна как авторизованному пользователю, так и не авторизованному, имеется общая информация о нашем приложении, название приложение, а также информация о проделанной работе каждого члена команды на данном проекте.
С главной страницы имеется возможность перейти по ссылке на видео, в котором team lead нашей команды подробно рассказывает о том, как пользоваться данным приложением. Также есть возможность перейти к спискам бордов. 
Приложение также адаптировано для мобильных устройств.

#### Используемые технологии:
#####  1. Angular
<ins>Преимущества:</ins>
1) MVC из коробки (в AngularJS используется схема MVC, разделяющая логику, представление и данные приложения, что позволяет создавать SPA приложения)
2) Удобен для написания SPA с динамически меняющимся контентом (навигация, разделение на переиспользуемые компоненты/модули, выделение логики в сервисные компоненты и тд)
3) Двустороннее связывание данных и мгновенное обновление содержимого
4) Удобные методы работы с сервером и обработки данных
5) Встроенные webpack, typescript
6) Безопасность (использование RESTFUL API для взаимодействия с серверами)
6) Декларативный стиль кода

<ins>Недостатки:</ins>
1) Дополнительное время на изучение
##### 2. Angular Material
<ins>Преимущества:</ins>
1) Стильный и современный дизайн
2) Готовые решения для стилизации сайта, встроенная анимация интерактивных элементов
3) Единообразие и удобство адаптации
4) Удобная кастомизация цветовых решений, изменения темы и тд.
5) Подключение только тех элементов, которые тебе требуются
6) Приличное количество компонентов
7) Следование гайдам Material Design

<ins>Недостатки:</ins>
1) Потеря индивидуальности (оригинальности)
2) Не все готовые решения подошли

##### 3. Eslint(@angular-eslint/recommended)/Prettier
<ins>Преимущества:</ins>
1) Единообразие и высокий уровень читаемости кода
2) Выработка хороших привычек кодирование

<ins>Недостатки:</ins>
1) необходимо время на устранение ошибок

##### 4. NgRx
<ins>Преимущества:</ins>
1) Единый источник правды, нет возможности напрямую изменить состояние, приложения будут работать более согласованно
2) Максимально чистые компоненты и сервисы
3) Высокая популярность библиотеки
4) Наличие множества дополнительных инструментов

<ins>Недостатки:</ins>
1) Дополнительное время на изучение
2) Каждый раз, когда вы добавляете какое-либо свойство в состояние, вам нужно добавлять действия, диспетчеры, вам может потребоваться обновить или 
   добавить селекторы, эффекты, если таковые имеются, обновить магазин. А также вы запускаете конвейерную (конкатенацию) rxjs операторов и 
   наблюдаемых повсюду

##### 5. Sass
<ins>Преимущества:</ins>
1) Интеграция в Angular Material
2) Упрощение написания стилей и переиспользуемость

##### 6. Плагин I18next
<ins>Преимущества:</ins>
1) Интеграция для интерфейсных фреймворков, таких, как AngularJS, React, Vue.js
2) Комплексное решение (имеются плагины для определения языка перевода, загрузки перевода, опционального кеширования перевода)
3) Масштабируемость (возможность разделять переводы на несколько файлов)
