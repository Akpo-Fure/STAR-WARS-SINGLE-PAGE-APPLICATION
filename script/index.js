function main() {
  let unOrderedList = document.querySelector("ul");
  let [img, characterName, characterHeight, characterGender, button] =
    document.querySelectorAll(".character-details>*");
  let main1 = document.querySelector(".main");
  let main2 = document.querySelector(".character-details");
  button.addEventListener("click", () => {
    main1.classList.remove("hide");
    main2.classList.add("hide");
  });

  async function getData() {
    unOrderedList.innerHTML = "Loading....";
    let res = await fetch("https://swapi.dev/api/people");
    let data = await res.json();
    unOrderedList.innerHTML = "";
    while (data.next !== null) {
      populateFrontend(data);
      res = await fetch(data.next);
      data = await res.json();
    }
  }
  getData();

  function populateFrontend(data) {
    data.results.forEach((person) => {
      let li = document.createElement("li");
      li.innerHTML = person.name;
      unOrderedList.append(li);
      li.addEventListener("click", () => {
        characterDetails(person);
      });
    });
  }
  function characterDetails(person) {
    characterName.innerHTML = `NAME:  ${person.name}`;
    characterHeight.innerHTML = `HEIGHT:  ${person.height}cm`;
    characterGender.innerHTML = `GENDER:  ${person.gender}`;

    main1.classList.add("hide");
    main2.classList.remove("hide");
  }
}

main();
