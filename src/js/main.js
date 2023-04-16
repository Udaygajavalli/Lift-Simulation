let inputPage = document.querySelector('#inputPage');
let simulationPage = document.querySelector('#simulationPage');
let simulate = document.querySelector('#simulate');



simulate.addEventListener('click', () => {
    let noOfFloors = document.querySelector('#noOfFloors').value;
    let noOfLifts = document.querySelector('#noOfLifts').value;
    if (noOfFloors == '' || noOfLifts == '') {
        alert('please enter some value');
    } else if (noOfLifts >= 13 || noOfFloors >= 6) {
        alert('Max 12 lifts and 5 floors can only be added');
    } else {
        inputPage.setAttribute('hidden', 'hidden');
        inputPage.classList.remove('d-flex');
        simulationPage.removeAttribute('hidden');
        makingFloors();
    }
});


function makingFloors() {
    let floorInput = document.querySelector('#noOfFloors').value;
    let liftInput = document.querySelector('#noOfLifts').value;

    for (let i = floorInput; i > 0; i--) {
        document.querySelector(
            '#simulationPage'
        ).innerHTML += `<div class="box"><div class="buttonLift"><div class="button"><button class="up btn btn-success" id="up${i}">Up</button><button class="down btn btn-danger" id="down${i}">Down</button></div></div><div class="hrfloorName"><hr><span>Floor ${i}</span></div></div>`;
    }

    let liftContainer = document.createElement('div');
    liftContainer.className = 'liftContainer';

    for (let j = 1; j <= liftInput; j++) {
        
        liftContainer.innerHTML += `<div class="lift" id="lift${j}" flag="free"><div class="gates" id="gates"><div class="gate1"></div><div class="gate2"></div></div></div>`;
    }


    const mainbuttonlift = document.querySelectorAll('.buttonLift');

    const lastbox = mainbuttonlift[mainbuttonlift.length - 1];

    lastbox.appendChild(liftContainer);

    let selectAllLift = document.querySelectorAll('.lift');
   
    let up = document.querySelectorAll('.up');

    let removeTopUp = document.querySelector(`#up${floorInput}`);

    removeTopUp.remove();

    let down = document.querySelectorAll('.down');

    let nUp = up.length;
    let prev = 0;

    let oldFloorValueArray = [];

    for (let i = 0; i < selectAllLift.length; i++) {
        oldFloorValueArray.push(1);
    }

    up.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {

                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    selectAllLift[i].setAttribute('flag', 'busy');

                    moveLift(
                        selectAllLift[i],
                        floorValue,
                        oldFloorValueArray[i]
                    );
                    oldFloorValueArray[i] = floorValue;
                    
                    break;
                }
            }
        });
    });

    down.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
                // console.log(selectAllLift)
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    selectAllLift[i].setAttribute('flag', 'busy');
                    moveLift(
                        selectAllLift[i],
                        floorValue,
                        oldFloorValueArray[i]
                    );
                    oldFloorValueArray[i] = floorValue;
                    
                    break;
                }
            }
        });
    });
}

function moveLift(liftno, floorNo, oldFloorValue) {
    liftno.style.transform = `translateY(${-95 * (floorNo - 1)}px)`;

    let prev = `${2 * Math.abs(floorNo - oldFloorValue)}s`;
    liftno.style.transitionDuration = prev;

    setTimeout(() => {
        gateopenclose(liftno);
        setTimeout(() => {
            liftno.setAttribute('flag', 'free');
        }, 5500);
        console.log(liftno.getAttribute('flag'));
    }, 2 * Math.abs(floorNo - oldFloorValue) * 1000);
}

function gateopenclose(liftno) {
    let gates = liftno.firstChild;
    let gate1 = document.querySelector('.gate1');
    let gate2 = document.querySelector('.gate2');
    setTimeout(() => {
        gates.children[0].style.width = '3px';
        gates.children[1].style.width = '3px';
    }, 1000);

    setTimeout(() => {
        gates.children[0].style.width = '25px';
        gates.children[1].style.width = '25px';
    }, 3500);
}

function deletingFloors() {
    let floorInput = document.querySelector('#noOfFloors').value;

    for (let i = floorInput; i > 0; i--) {
        let floorContainer = document.querySelector('.box');
        floorContainer.remove();
    }
}

