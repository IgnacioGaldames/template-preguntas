
//Arrays vacíos
var preguntasFinalesArray = [];
var misRespuestas = [];
var misRespuestasInt = [];
var lasRespuestasInt = [];
var miRespuesta0 = [];
var miRespuesta1 = [];
var miRespuesta2 = [];
var miRespuesta3 = [];
var miTimeout;

// Preguntas
var preguntasArray = [
    [
        "¿Cual es la pregunta 1?",
        "respuesta A1",
        "respuesta B1",
        "respuesta C1",
        1
    ],
    [
        "¿Cual es la pregunta 2?",
        "respuesta A2",
        "respuesta B2",
        "respuesta C2",
        2
    ],
    [
        "¿Cual es la pregunta 3?",
        "respuesta A3",
        "respuesta B3",
        "respuesta C3",
        3
    ],
    [
        "¿Cual es la pregunta 4?",
        "respuesta A4",
        "respuesta B4",
        "respuesta C4",
        1
    ],
    [
        "¿Cual es la pregunta 5?",
        "respuesta A5",
        "respuesta B5",
        "respuesta C5",
        2
    ],
    [
        "¿Cual es la pregunta 6?",
        "respuesta A6",
        "respuesta B6",
        "respuesta C6",
        3
    ],
    [
        "¿Cual es la pregunta 7?",
        "respuesta A7",
        "respuesta B7",
        "respuesta C7",
        1
    ],
    [
        "¿Cual es la pregunta 8?",
        "respuesta A8",
        "respuesta B8",
        "respuesta C8",
        2
    ]
];

function randomize(a, b) {
    return Math.random() - 0.5;
}

function primerasCuatro() {
    preguntasArray.sort(randomize);
    preguntasFinalesArray = [preguntasArray[0], preguntasArray[1], preguntasArray[2], preguntasArray[3]];
}

function matarTimer() {
    limpiarTimeout();
    $('#barraProgreso').remove();
}

function barraTimer() {
    matarTimer();
    var barra = '<div id="barraProgreso"></div>';
    $('#timer').append(barra);
    $('#barraProgreso').addClass('transicion');
    $('#barraProgreso').width('0%');
    cargarTimeout();
}

function cargarTimeout() {
    miTimeout = window.setTimeout(alertaTimeout, 20000);
}

function alertaTimeout() {
    alert("Se acabó el tiempo. Empieza otra vez.");
    reiniciarPreguntas();
}

function limpiarTimeout() {
    window.clearTimeout(miTimeout);
}

// funcion de error

function reiniciarPreguntas() {

    borrarDivsRespuestas();
    primerasCuatro();
    generarPreguntas();

}

//Extraer las preguntas y respuestas finales

var lasRespuestas = [];

function generarPreguntas() {
    barraTimer();
    inicioDiv = '<div class="respuesta"><input type="radio" value="';
    finDiv = '</span></div>';
    divBoton = '<button class="siguiente">Siguiente Pregunta</button>';
    $.each(preguntasFinalesArray, function(index) {
        var elemento = '<div id="bloque' + index + '" class="bloque hidden"><div id="pregunta' + index + '">' + $(this)[0] + '</div><form action="" id="todasLasPreguntas' + index + '">' + inicioDiv +'1" name="laRespuesta' + index + '"><span>' + $(this)[1] + finDiv + '' + inicioDiv +'2" name="laRespuesta' + index + '"><span>' + $(this)[2] + finDiv + '' + inicioDiv +'3" name="laRespuesta' + index + '"><span>' + $(this)[3] + finDiv + '</form>' + divBoton ;
        $('#holder').append(elemento);

        lasRespuestas.push($(this)[4]);
    });
    $('.bloque:first-child').removeClass('hidden').addClass('show');

    $('.siguiente').on('click', function(e) {
        barraTimer();

        var respuestaClickeada = null;
        var inputs = $(this).siblings('form').find('input');
        $.each(inputs, function() {
            if ($(this).is(':checked')) {
                respuestaClickeada = $(this).val();
            }
        });

        if (respuestaClickeada) {
            var respuestaCorrecta = lasRespuestas[$(this).parent().index()];
            if (respuestaClickeada == respuestaCorrecta) {
                var hayOtra = $(this).parent().next('.bloque');
                if (hayOtra.length > 0) {
                    $(this).parent().removeClass("show").addClass("hidden");
                    $(this).parent().next().removeClass("hidden").addClass("show");

                } else {
                    matarTimer();
                    $('.siguiente').addClass("hidden");

                    $('.felicidades').removeClass('hidden');

                }
            } else {
                alert('Respuesta Equivocada. Empieza otra vez.');
                reiniciarPreguntas();
            }
        }
        e.preventDefault();
    });
}

function borrarDivsRespuestas() {
    lasRespuestas = [];
    $(".bloque").remove();
}

$(document).ready(function() {
    primerasCuatro();
    generarPreguntas();

});
