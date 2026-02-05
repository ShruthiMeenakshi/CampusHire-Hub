package com.vcet.campushire.aop;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerformanceAspect {

    private static final Logger log =
            LoggerFactory.getLogger(PerformanceAspect.class);

    @Around("execution(* com.vcet.campushire.admin.placementdrive.service..*(..))")
    public Object measureTime(ProceedingJoinPoint jp) throws Throwable {

        long start = System.currentTimeMillis();
        Object result = jp.proceed();
        long end = System.currentTimeMillis();

        log.info("Method {} executed in {} ms",
                jp.getSignature(), (end - start));

        return result;
    }
}
