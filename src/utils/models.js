const typeorm = require("typeorm");

const { isArray, isObject } = require("../helpers/validation");

/**
 * @param {{}} where
 * @returns
 */
function createWhereSelector(where) {
  return Object.keys(where)
    .reduce((simpan, key) => {
      return [...simpan, `${key}=:${key}`];
    }, [])
    .join(" AND ");
}

/**
 * @param {{}} where
 * @returns
 */
function createWhereLikeSelector(where) {
  return Object.keys(where)
    .reduce((simpan, key) => {
      return [
        ...simpan,
        where[key] === "*" ? false : `LOWER(${key}) LIKE :${key}`,
      ];
    }, [])
    .filter((v) => {
      return v;
    })
    .join(" OR ");
}

// ===================================================================================

const Model = {
  escape: (value) => {
    return String(value).replace(/'/g, "\\'");
  },

  /**
   * Custom Query with ORM Function
   * @param {*} entity
   * @returns {typeorm.SelectQueryBuilder}
   */
  table: (entity) => {
    return typeorm.getConnection().createQueryBuilder().from(entity);
  },

  /**
   * Create : insert new data
   * @param {*} entity
   * @param {[]|{}} data
   * @returns
   */
  inputFrom: async (entity, data) => {
    const new_data = [];
    if (isArray(data)) {
      new_data.push(...data);
    } else if (isObject(data)) {
      new_data.push(data);
    } else {
      throw new Error("please use Array Or Object to insert data!!!");
    }
    try {
      return await typeorm
        .getConnection()
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(new_data)
        .execute();
    } catch (error) {
      return false;
    }
  },

  /**
   * Create : insert new data with ID
   * @param {*} entity
   * @param {[]|{}} data
   * @returns
   */
  inputFromGetId: async (entity, data) => {
    const new_data = [];
    if (isArray(data)) {
      new_data.push(...data);
    } else if (isObject(data)) {
      new_data.push(data);
    } else {
      throw new Error("please use Array Or Object to insert data!!!");
    }
    try {
      const result = await typeorm
        .getConnection()
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(new_data)
        .execute();
      return result.identifiers[0].id;
    } catch (error) {
      return false;
    }
  },

  /**
   * Read : view data
   * @param {*} entity
   * @param {{}} where
   * @returns
   */
  selectFrom: async (entity, where = {}) => {
    return await typeorm
      .getRepository(entity)
      .createQueryBuilder()
      .where(createWhereSelector(where), where)
      .getMany();
  },

  /**
   * Read : make custom query
   * @param {string} query
   * @returns
   */
  customQuery: async (query) => {
    const entityManager = typeorm.getManager();
    return entityManager.query(query, []);
  },

  /**
   * Read : make list data by query in()
   * @param {*} Entity
   * @param {string} selector
   * @param {[]} array
   * @returns
   */
  in: async (Entity, selector, array) => {
    const id = array
      .filter((v) => !String(v).includes("'")) // escape SQLi
      .map((v) => `'${v}'`)
      .join(", ");
    if (id.length === 0) return [];
    return await Model.customQuery(
      `SELECT * FROM ${Entity.options.tableName} WHERE ${selector} in(${id})`
    );
  },

  /**
   * Read : validation data
   * @param {*} entity
   * @param {{}} where
   * @returns
   */
  isExist: async (entity, where) => {
    const result = await Model.selectFrom(entity, where);
    if (result.length > 0) {
      return result[0];
    }
    return false;
  },

  /**
   * Read : for table
   * @param {*} entity
   * @param {{}} keywords
   * @param {number} shows
   * @param {number} pages
   * @param {boolean} desc
   * @returns
   */
  paginationFrom: async (entity, keywords, shows, pages, desc = false) => {
    const take = shows <= 0 ? 10 : shows;
    const page = parseInt(pages, 10) <= 0 ? 1 : parseInt(pages, 10);

    const keyword =
      typeof keywords === "object" && !Array.isArray(keywords)
        ? Object.keys(keywords).reduce((simpan, key) => {
            return {
              ...simpan,
              [key]:
                keywords[key] === "*"
                  ? "*"
                  : `%${String(keywords[key]).toLowerCase()}%`,
            };
          }, {})
        : {};
    const orderBy = desc ? "DESC" : "ASC";
    const skip = (page - 1) * take;

    const totalData = (await Model.selectFrom(entity, {})).length;

    const data = await typeorm
      .getRepository(entity)
      .createQueryBuilder()
      .where(createWhereLikeSelector(keyword), keyword)
      .orderBy("id", orderBy)
      .skip(skip)
      .take(take)
      .getMany();

    // return data
    const lastPage = Math.ceil(totalData / shows);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data,
      totalData,

      currentPage: page,
      lastPage,
      nextPage,
      prevPage,
    };
  },

  /**
   * Update : update data
   * @param {*} entity
   * @param {{}} selector
   * @param {{}} data
   * @returns
   */
  updateFrom: async (entity, where, data) => {
    return await typeorm
      .getConnection()
      .createQueryBuilder()
      .update(entity)
      .set(data)
      .where(createWhereSelector(where), where)
      .execute();
  },

  /**
   * Delete : delete data
   * @param {*} entity
   * @param {{}} where
   * @returns
   */
  deleteFrom: async (entity, where) => {
    if ((await Model.selectFrom(entity, where)).length > 0) {
      return await typeorm
        .getConnection()
        .createQueryBuilder()
        .delete()
        .from(entity)
        .where(createWhereSelector(where), where)
        .execute();
    }
    return false;
  },
};

module.exports = Model;
