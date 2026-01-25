package com.vcet.campushire.admin.placementdrive.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger log =
            LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.vcet.campushire.admin.placementdrive..*(..))")
    public void logBefore(JoinPoint jp) {
        log.info("Entering: {}", jp.getSignature());
    }

    @AfterReturning(
            pointcut = "execution(* com.vcet.campushire.admin.placementdrive..*(..))")
    public void logAfter(JoinPoint jp) {
        log.info("Exiting: {}", jp.getSignature());
    }
}
