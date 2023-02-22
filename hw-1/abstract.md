#### Основные свойства

Любой HTML-элемент имеет следующие основные свойства:

- Свойство `id` — идентификатор элемента:

```javascript
const div = document.querySelector("#main");
console.log(div.id); // main
Свойство className — CSS-класс элемента:
const paragraph = document.querySelector(".text");
console.log(paragraph.className); // text
```

- Свойство `innerText` и свойство `textContent` — текстовое содержимое внутри элемента.
  Есть небольшие различия в работе этих свойств, однако в нашем примере они вернут одинаковый результат:

```javascript
const paragraph = document.querySelector(".text");
console.log(paragraph.innerText); // Первый абзац
console.log(paragraph.textContent); // Первый абзац
Свойство innerHTML — содержит в себе код HTML-разметки внутри элемента:
const div = document.querySelector("#main");
console.log(div.innerHTML);
```

- Выведет в консоль следующий код `HTML` (в виде строки со всеми отступами):

```javascript
<p class="text" data-id="1">Первый абзац</p>
<p class="text" data-id="2">Второй абзац</p>
```

- Свойство `children` — коллекция дочерних элементов:

```javascript
const div = document.querySelector("#main");
console.log(div.children);
```

- Data-атрибуты

Data-атрибуты — это атрибуты `HTML-элементов`, название которых начинается с data-. В нашем примере такие атрибуты `(data-id)` есть у элемента `p`:

```javascript
<p class="text" data-id="1">
	Первый абзац
</p>
```

Data-атрибуты позволяют хранить дополнительную информацию в стандартных элементах `HTML`, что бывает очень полезно. То есть с их помощью можно создавать свои собственные атрибуты для элементов.

- Получить коллекцию data-атрибутов можно с помощью свойства `dataset`:

```javascript
const paragraph = document.querySelector(".text");
console.log(paragraph.dataset);
```

В результате в консоль будет выведен объект `DOMStringMap`, представляющий собой словарь пар "ключ-значение" для data-атрибутов.

- Обратиться к значению атрибута можно как к свойству объекта `dataset`:

```javascript
const paragraph = document.querySelector(".text");
console.log(paragraph.dataset.id); // "1"
```

Обрати внимание, что название атрибута в результирующем словаре пишется без приставки `data-`, то есть вместо `data-id` мы обращаемся к свойству `id`.

- Изменить значение data-атрибута можно так же, как и обычное свойство любого объекта:

```javascript
paragraph.dataset.id = 123;
```

- Стили

К коллекции стилей элемента можно обратиться с помощью свойства `style`, например:

```javascript
const paragraph = document.querySelector(".text");
console.log(paragraph.style);
```

В консоль будет выведен длинный список всех возможных стилей элемента.

- Задать стиль можно обратившись к конкретному свойству объекта `style`:

```javascript
paragraph.style.color = "red";
paragraph.style.backgroundColor = "gray";
```

Цвет текста в первом абзаце после этого поменяется на красный, а цвет фона — на серый.

Обрати внимание, что названия свойств в `JavaScript` и `CSS` пишутся в разном стиле:

Для свойств `JavaScript` используется `lowerCamelCase` — первая буква маленькая, далее каждое слово начинается с большой буквы.
Для свойств `CSS` используется `kebab-case` — все буквы маленькие, слова разделяются дефисом.
К примеру, к CSS-свойству `background-color` мы обращаемся из кода через `style.backgroundColor`.

#### Создание элемента

- Создать элемент можно с помощью метода _`createElement()`_.

Создадим ещё один абзац p, а также зададим ему класс, data-атрибут и текст:

```javascript
const newParagraph = document.createElement("p");
newParagraph.className = "text";
newParagraph.dataset.id = "3";
newParagraph.textContent = "Третий абзац";
```

При выводе этого элемента в консоль мы увидим следующую картину:

```javascript
<p class="text" data-id="3">
	Третий абзац
</p>
```

В дальнейших примерах под элементом _`newParagraph`_ будет подразумеваться этот созданный нами элемент.

#### Добавление элемента на страницу

После создания элемент нужно добавить на страницу. Для этого существует несколько основных методов:

_`prepend()`_ — вставляет элемент в начало заданного узла.
_`append()`_ — вставляет элемент в конец узла.
_`before()`_ — вставляет элемент перед узлом.
_`after()`_ — вставляет элемент после узла.

#### Добавление элемента с помощью insertAdjacentElement()

Метод _`insertAdjacentElement()`_ позволяет добавить элемент в нужную позицию в зависимости от указанных параметров.

Синтаксис метода:

_`elem.insertAdjacentElement(where, newElem)`_;
где _`elem`_ — существующий элемент, внутрь или рядом с которым нужно вставить новый элемент newElem.

Параметр where может принимать следующие значения:

- \*`"beforebegin"` – вставить newElem непосредственно перед elem,
- _`"afterbegin"`_ – вставить newElem в начало elem,
- _`"beforeend"`_ – вставить newElem в конец elem,
- _`"afterend"`_– вставить newElem непосредственно после elem.
  К примеру, следующий код будет работать аналогично вставке с помощью append():

```javascript
const div = document.querySelector("#main");
div.insertAdjacentElement("beforeend", newParagraph);
```

По сути, метод _`insertAdjacentElement()`_ имеет похожую функциональность, как набор методов _`append()`_, 8`prepend()`_, _`before()`_ и _`after()`\*, только другой синтаксис.

#### Остальные методы HTML-элементов

- remove()

Метод `remove()` удаляет элемент из `DOM-`дерева.

Исходный HTML:

```javascript
<div id="main">
	<p class="text" data-id="1">
		Первый абзац
	</p>
	<p class="text" data-id="2">
		Второй абзац
	</p>
</div>
```

Удалим первый абзац:

```javascript
const p = document.querySelector("p");
p.remove();
```

Результирующий `HTML`:

```javascript
<div id="main">
	<p class="text" data-id="2">
		Второй абзац
	</p>
</div>
```

- closest()

Метод `closest()` находит ближайший родительский элемент по заданному селектору. Сам элемент тоже включается в поиск, то есть если сам элемент удовлетворяет условию селектора, то будет возвращен он:

```javascript
const p = document.querySelector("p");
const parent = p.closest("div");
```

В данном примере переменная parent будет содержать родительский элемент `div`.

- Коллекция классов `classList`

Свойство `classList` содержит в себе коллекцию классов элемента:

```javascript
const p = document.querySelector("p");
const classList = p.classList;
```

В нашем примере коллекция будет содержать единственное значение "text".

У `classList` есть несколько методов:

Метод `add()` — добавляет класс к элементу
Метод `remove()` — удаляет класс
Метод `toggle()` — добавляет класс, если его ещё нет, иначе удаляет
Метод `replace()` — заменяет один класс другим
Добавим класс к нашему элементу `p`:

```javascript
const p = document.querySelector("p");
p.classList.add("red");
```

Результирующий `HTML`:

```javascript
<p class="text red" data-id="1">
	Первый абзац
</p>
```

- Работа с атрибутами

Для работы с атрибутами элемента существует несколько методов:

Метод `hasAttribute()` — имеет ли элемент указанный атрибут. Возвращает булево значение:

```javascript
const p = document.querySelector("p");
console.log(p.hasAttribute("class")); // true
```

Метод `getAttribute()` — получает значение атрибута по имени:

```javascript
const p = document.querySelector("p");
console.log(p.getAttribute("class")); // text
```

Метод `setAttribute()` — устанавливает значение атрибута:

```javascript
const p = document.querySelector("p");
p.setAttribute("id", "firstParagraph");
console.log(p.getAttribute("id")); // firstParagraph
```

Метод `removeAttribute()` — удаляет атрибут.
