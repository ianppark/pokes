const UICtrl = (function() {
  const UI_typeTitle = document.querySelector('.type-title');
  const UI_seAttack = document.getElementById('se-attack');
  const UI_nveAttack = document.getElementById('nve-attack');
  const UI_neAttack = document.getElementById('ne-attack');
  const UI_seDefend = document.getElementById('se-defend');
  const UI_nveDefend = document.getElementById('nve-defend');
  const UI_neDefend = document.getElementById('ne-defend');

  const update = (currType, data) => {
    const {
      double_damage_to,
      double_damage_from,
      half_damage_to,
      half_damage_from,
      no_damage_to,
      no_damage_from
    } = data.damage_relations;

    UI_typeTitle.innerHTML = data.name;
    UI_typeTitle.classList.remove(currType);
    UI_typeTitle.classList.add(data.name);

    UI_seAttack.innerHTML = double_damage_to
      .map(({ name }) => `<div class="badge ${name}">${name}</div>`)
      .join('');

    UI_nveAttack.innerHTML = half_damage_to
      .map(({ name }) => `<div class="badge ${name}">${name}</div>`)
      .join('');

    UI_neAttack.innerHTML = no_damage_to
      .map(({ name }) => `<div class="badge ${name}">${name}</div>`)
      .join('');

    UI_seDefend.innerHTML = double_damage_from
      .map(({ name }) => `<div class="badge ${name}">${name}</div>`)
      .join('');

    UI_nveDefend.innerHTML = half_damage_from
      .map(({ name }) => `<div class="badge ${name}">${name}</div>`)
      .join('');

    UI_neDefend.innerHTML = no_damage_from
      .map(({ name }) => `<div class="badge ${name}">${name}</div>`)
      .join('');
  };

  return {
    update
  };
})();

const AppCtrl = (function() {
  let currentType = 'normal';

  // load event listeners
  const loadEventListeners = () => {
    [...document.querySelectorAll('.type-card')].forEach(card => {
      card.addEventListener('click', handleClick);
    });
  };

  const setType = newType => {
    currentType = newType;
  };

  const handleClick = async e => {
    newType = e.target.innerHTML;
    axios
      .get(`https://pokeapi.co/api/v2/type/${newType}/`)
      .then(res => {
        console.log(res.data);
        UICtrl.update(currentType, res.data);
        currentType = newType;
      })
      .catch(err => console.error(err));
  };

  return {
    init: () => {
      loadEventListeners();
    }
  };
})();

AppCtrl.init();
