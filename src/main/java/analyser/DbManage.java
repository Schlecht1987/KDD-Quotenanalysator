package analyser;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class DbManage {
    public static SessionFactory sessionFactory;

    /** The logger. */
    private static final Logger  logger = LoggerFactory.getLogger(DbManage.class);

    /**
     * Instantiates a new db manage.
     */
    public DbManage() {


    }
    
    public static void init(){
        sessionFactory = getSessionFactory();
    }
    
    /**
     * Save object.
     *
     * @param o the o
     * @param info the info
     * @return the boolean
     */
    public static Boolean saveObject(Object o, String info) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.save(o);
            session.getTransaction().commit();
            logger.info("Sucessfully saved 'Object': " + info);
            return true;
        } catch (Exception e) {
            if (session.getTransaction() != null)
                session.getTransaction().rollback();
            logger.info("Error in saveOject:  fail to save: " + info);
            e.printStackTrace();
        } finally {
            session.close();
        }
        return false;
    }

    public static Boolean updateObject(Object o, String info) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.update(o);
            session.getTransaction().commit();
            logger.info("Sucessfully updated 'Object': " + info);
            return true;
        } catch (Exception e) {
            if (session.getTransaction() != null)
                session.getTransaction().rollback();
            logger.info("Error in updateOject:  fail to save: " + info);
            e.printStackTrace();
        } finally {
            session.close();
        }
        return false;
    }

    public static Boolean deleteObject(Object o, String info) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            session.delete(o);
            session.getTransaction().commit();
            logger.info("Sucessfully deleted 'Object': " + info);
            return true;
        } catch (Exception e) {
            if (session.getTransaction() != null)
                session.getTransaction().rollback();
            logger.info("Error in delete Oject:  fail to save: " + info);
            e.printStackTrace();
        } finally {
            session.close();
        }
        return false;
    }
    
    /**
     * Gets the query.
     *
     * @param query the query
     * @return the query
     */
    public static List<?> getQuery(String query) {
        Session session = sessionFactory.openSession();
        try {
            session.beginTransaction();
            Query q = session.createQuery(query);
            List<?> l = q.list();
            session.getTransaction().commit();
            return l;
        } catch (Exception e) {
            if (session.getTransaction() != null)
                session.getTransaction().rollback();
            logger.info("Error in getQuery: query fail: " + query);
            e.printStackTrace();
        } finally {
            session.close();
        }
        return null;
    }
    
    
    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            // loads configuration and mappings
            Configuration configuration = new Configuration().configure();
            ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();

            // builds a session factory from the service registry
            sessionFactory = configuration.buildSessionFactory(serviceRegistry);
        }
        return sessionFactory;
    }
}
