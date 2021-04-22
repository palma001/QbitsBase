import { date } from 'quasar'
/**
 * Translates the tags in Entities
 * @param {String} message tag to translate
 * @param {String} Entity to translate
 */
export const translateEntity = function (entity, message) {
  return this.$i18n.t(`template.${entity}.${message}.label`)
}
/**
 * translate text
 * @param  {String} value text translate
 * @return {String}       text translated
 */
export const translateLabel = function (value) {
  return this.$i18n.t(`template.${value}.label`)
}

/**
 * translate text
 * @param  {String} value text translate
 * @return {String}       text translated
 */
export const errorRequest = function (error) {
  switch (error.slice(error.indexOf(';') + 2)) {
    case 'Expected non-nullable type Int! not to be null at value.caja_id.' :
      return 'boxIsrequired'
    default:
      return ''
  }
}
/**
 * ucwords text
 * @param  {String} value text ucwords
 * @return {String}       text ucwords
 */
export const ucwords = function (value) {
  return value.toLowerCase().charAt(0).toUpperCase() + value.slice(1)
}
/**
 * Assign data to each selects
 * @param {Array} currentDataConfig
 * @param {String} propTag
 * @param {String} propData
 * @param {Array} list
 */
function assignRelationalData (currentDataConfig, propTag, propData, list) {
  currentDataConfig.forEach(config => {
    config.children.forEach(child => {
      if (child.actionable && child.actionable.propTag === propTag) {
        child.actionable.component.props[propData] = list
      }
    })
  })
}
/**
 * Gets relational data of the entity
 * @param {{relationalData: Array<Object>, config: Array<Object>}} entityConfig
 * @param {Array} toRelationalData
 * @param {Object} vueInstance
 * @param {(validApiResponse) => void} [callback = () => void]
 */
export const setRelationalData = (
  entityConfig,
  toRelationalData,
  vueInstance,
  callback = () => {}
) => {
  if (entityConfig) {
    entityConfig.relationalData.forEach(dataConfig => {
      vueInstance.$services.getData(dataConfig.services, dataConfig.petitionParams)
        .then(({ res }) => {
          toRelationalData = []
          toRelationalData = toRelationalData.concat(res.data)
          assignRelationalData(
            entityConfig.config,
            dataConfig.targetPropTag,
            dataConfig.propData,
            toRelationalData
          )
          callback(res.data, toRelationalData)
        })
    })
  }
}

export const can = (self, module, permission) => {
  self.$mockData.getData('authorizations')
    .then(({ response }) => {
      self.permissions = response.data.content.filter(permission => {
        return permission.name === module
      })[0]
    })

  if (self.permissions.permissions) {
    return self.permissions.permissions[permission]
  }
}

export const date2 = (dateFormating) => {
  const newDate = new Date(dateFormating)
  return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
}

export const time = (timeFormating) => {
  const newDate = new Date(timeFormating)
  return `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
}

export const notify = (self, message, color, icon, position = 'bottom-right') => {
  self.$q.notify({
    message: ucwords(self.$t(message)),
    color: color,
    position: position,
    icon: icon
  })
}
export const unitTime = (param) => {
  let between = {}
  if (param === 'Día anterior') {
    let newDate = date.subtractFromDate(new Date(), { days: 1 })
    newDate = date.formatDate(newDate, 'YYYY-MM-DD')
    between = {
      from: newDate,
      to: newDate
    }
  }
  if (param === 'Día') {
    const newDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    between = {
      from: newDate,
      to: newDate
    }
  }
  if (param === 'Mes') {
    const newDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    const initDate = date.startOfDate(newDate, 'month')
    const endDate = date.endOfDate(newDate, 'month')
    between = {
      from: initDate,
      to: endDate
    }
  }
  if (param === 'Mes anterior') {
    let newDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    newDate = date.subtractFromDate(newDate, { month: 1 })
    const initDate = date.startOfDate(newDate, 'month')
    const endDate = date.endOfDate(newDate, 'month')
    between = {
      from: initDate,
      to: endDate
    }
  }
  return between
}

export const methods = {
  translateEntity,
  translateLabel,
  setRelationalData,
  ucwords,
  can,
  notify,
  errorRequest,
  date2,
  time,
  unitTime
}
