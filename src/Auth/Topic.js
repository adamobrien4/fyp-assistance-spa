class Topic {
  constructor(attrs) {
    Object.assign(this, attrs)
  }

  static get modelName() {
    return 'Topic'
  }
}

export default Topic
