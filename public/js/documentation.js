
// IIFE

const pokemonRepository = (() => {


  let loadList = () => {
    return fetch("/js/documentation.json")
      .then( (response) => { return response.json();})
      .then((data) => { 
      
        for (let i = 0; i < data.length; i++){

            const objectListContainer = document.querySelector(".accordion");
            let container = document.createElement("div"),
            containerSub1 = document.createElement("div"),
            clickContainer = document.createElement("a");
            containerHeader = document.createElement("h5"),
            badgeContainer = document.createElement("span"),
            badgeText = document.createElement("text"),
            nameText = document.createElement("h6"),
            containerSub2 = document.createElement("div"),
            cardContainer = document.createElement("div"),
            descriptionContainer = document.createElement("h5"),
            documentationContainer = document.createElement("div"),
            documentationRow = document.createElement("div"),
            documentationRequired = document.createElement("div"),
            requiredText = document.createElement("div"),
            documentationExample = document.createElement("div"),
            exampleText = document.createElement("div"),
            documentationResponse = document.createElement("div"),
            responseText = document.createElement("div"),
            badge = "";

            container.classList.add("accordion-item");

            containerSub1.classList.add("card-header")
            containerSub1.classList.add("special-color");
            containerSub1.classList.add("z-depth-2");
            containerSub1.classList.add("branch");

            containerSub1.setAttribute("id", "Search-header" + i);

            clickContainer.setAttribute("rel", "nofollow");
            clickContainer.setAttribute("href", "#Search-body" + i);
            clickContainer.setAttribute("aria-controls", "Search-body" + i);
            clickContainer.setAttribute("data-toggle", "collapse");
            clickContainer.setAttribute("data-parent", "#accordion1");
            clickContainer.setAttribute("aria-expanded", "false");
            clickContainer.classList.add("mb-0");
            clickContainer.classList.add("py-1");
            clickContainer.classList.add("collapsed");

            containerHeader.classList.add("mb-0");
            containerHeader.classList.add("white-text");
            containerHeader.classList.add("font-weight-bold");

            badgeContainer.classList.add("badge");

            documentationContainer.classList.add("container");
            documentationRow.classList.add("row");
            documentationRequired.classList.add("col");
            requiredText.classList.add("text");
            documentationExample.classList.add("col");
            exampleText.classList.add("text");
            documentationResponse.classList.add("col");
            responseText.classList.add("text");

            if (data[i].method === "GET") {
              badge = "badge-success";
            } else if (data[i].method === "POST") {
              badge = "badge-warning";
            } else if (data[i].method === "PUT") {
              badge = "badge-primary";
            } else if (data[i].method === "DELETE") {
              badge = "badge-danger";
            }

            badgeContainer.classList.add(badge);
            badgeContainer.innerText = data[i].method + " " ;
            badgeText.innerText = "    " + data[i].query;
            
            nameText.classList.add("nameText");
            nameText.innerText = data[i].name;

            documentationRequired.innerText = "Required";
            requiredText.innerText = data[i].required;
            documentationExample.innerText = "Example";
            exampleText.innerText = data[i].example;
            documentationResponse.innerText = "Response";

            data[i].status.code;



            containerSub2.classList.add("hide");
            containerSub2.classList.add("collapse");
            containerSub2.setAttribute("id", "Search-body" + i);
            containerSub2.setAttribute("aria-labelledby", "Search-body" + i);
            containerSub2.setAttribute("role", "tabpanel");
            containerSub2.setAttribute("data-parent", "#accordion1");

            cardContainer.classList.add("card-body");
            descriptionContainer.innerText = data[i].description;

            documentationContainer.appendChild(documentationRow);
            documentationRow.appendChild(documentationRequired);
            documentationRequired.appendChild(requiredText);
            documentationRow.appendChild(documentationExample);
            documentationExample.appendChild(exampleText);
            documentationRow.appendChild(documentationResponse);
            documentationResponse.appendChild(responseText);
            cardContainer.appendChild(descriptionContainer);

            cardContainer.appendChild(documentationContainer);

            containerSub2.appendChild(cardContainer);
            

            containerHeader.appendChild(badgeContainer);
            containerHeader.appendChild(badgeText);
            containerHeader.appendChild(nameText);
            clickContainer.appendChild(containerHeader);
            containerSub1.appendChild(clickContainer);
            container.appendChild(containerSub1);
            container.appendChild(containerSub2);
            objectListContainer.appendChild(container);

        }

      })
      .catch((e) => {
        console.error(e);
      });
  };

  return {

    loadList
  };
})();

pokemonRepository
  .loadList();