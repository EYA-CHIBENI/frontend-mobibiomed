
const Home = () => {
    return (
        <main className="home-page">
            <section className="home-hero">
                <div className="hero-content">
                    <img
                        src="/mobibiomed-logo.png"
                        alt="MOBIBIOMED"
                        className="home-logo"
                    />

                    <span className="hero-badge">
                        Biomedical Maintenance Management System
                    </span>

                    <h1>
                        Better Equipment Management.
                        <span> Better Healthcare.</span>
                    </h1>

                    <p className="hero-description">
                        MOBIBIOMED helps hospitals manage biomedical equipment,
                        organize maintenance activities and ensure complete
                        traceability throughout the equipment lifecycle.
                    </p>
                </div>

                <div className="features-section">
                    <article className="feature-card">
                        <div className="feature-icon">⚕</div>
                        <div>
                            <h3>Equipment Management</h3>
                            <p>
                                Centralize equipment information and monitor
                                its status and department.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">⚙</div>
                        <div>
                            <h3>Maintenance Monitoring</h3>
                            <p>
                                Manage requests, schedule interventions
                                and follow their progress.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card traceability-card">
                        <div className="feature-icon">↗</div>
                        <div>
                            <h3>Complete Traceability</h3>
                            <p>
                                Track decisions, assignments, maintenance
                                activities and intervention history.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">♙</div>
                        <div>
                            <h3>Role-Based Access</h3>
                            <p>
                                Give every hospital staff member
                                appropriate access and responsibilities.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            <section className="home-footer">
                <h2>Keeping Biomedical Equipment Reliable</h2>
                <p>Better maintenance. Clear traceability. Safer healthcare.</p>
            </section>
        </main>
    )
}

export default Home
