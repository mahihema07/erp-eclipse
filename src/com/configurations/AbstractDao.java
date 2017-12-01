package com.configurations;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractDao<PK extends Serializable, T> {

	private final Class<T> persistentClass;

	@SuppressWarnings("unchecked")
	public AbstractDao() {
		this.persistentClass = (Class<T>) ((ParameterizedType) this.getClass()
				.getGenericSuperclass()).getActualTypeArguments()[1];
	}

	@Autowired
	private SessionFactory sessionFactory;

	/*
	 * Method to get hibernate session
	 * 
	 * @return hibernate session
	 */
	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	/*
	 * Method to get Entity by primery key
	 * 
	 * @return Entity
	 */
	@SuppressWarnings("unchecked")
	public T getByKey(PK key) {
		return (T) getSession().get(persistentClass, key);
	}

	/*
	 * Method to persist (save) an entity
	 * 
	 * @return nothing
	 */
	public void persist(T entity) {
		getSession().persist(entity);
	}

	/*
	 * Method to save an entity
	 * 
	 * @return nothing
	 */
	public void save(T entity) throws Exception {
		getSession().save(entity);
	}

	/*
	 * Method to update an entity
	 * 
	 * @return nothing
	 */
	public void update(T entity) {
		getSession().update(entity);
	}

	/*
	 * Method to save / update an entity. If the entity contain primary key (not
	 * zero) it will do an update operation otherwise, it saves the entity
	 * 
	 * @return nothing
	 */
	public void saveOrUpdate(T entity) {
		getSession().saveOrUpdate(entity);
	}

	/*
	 * Method to delete an entity
	 * 
	 * @return nothing
	 */
	public void delete(T entity) {
		getSession().delete(entity);
	}

	/*
	 * Method to get criteria instance for the entity
	 * 
	 * @return
	 */
	protected Criteria createEntityCriteria() {
		return getSession().createCriteria(persistentClass);
	}
}
