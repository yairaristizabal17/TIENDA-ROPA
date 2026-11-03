
const client = require('@prometheus-io/client');

// Registro de métricas
const register = new client.Registry();

client.collectDefaultMetrics({
    register,
    prefix: 'ms_ventas_'
});

// Contador de solicitudes HTTP
const solicitudesHTTP = new client.Counter({
    name: 'ms_ventas_solicitudes_http_total',
    help: 'Total de solicitudes HTTP recibidas',
    labelNames: ['metodo', 'ruta', 'estado']
});

// Histograma de tiempo de respuesta
const tiempoRespuesta = new client.Histogram({
    name: 'ms_ventas_tiempo_respuesta_segundos',
    help: 'Tiempo de respuesta de las solicitudes HTTP',
    labelNames: ['metodo', 'ruta'],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

register.registerMetric(solicitudesHTTP);
register.registerMetric(tiempoRespuesta);

module.exports = {
    register,
    solicitudesHTTP,
    tiempoRespuesta
};
