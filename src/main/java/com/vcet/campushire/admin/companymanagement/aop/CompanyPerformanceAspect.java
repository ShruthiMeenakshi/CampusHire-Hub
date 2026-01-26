package com.vcet.campushire.admin.companymanagement.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CompanyPerformanceAspect {

    @Pointcut(
            "execution(* com.vcet.campushire.admin.companymanagement.service..*(..)) || " +
                    "execution(* com.vcet.campushire.admin.companymanagement.repository..*(..))"
    )
    public void performanceMethods() {}

    @Around("performanceMethods()")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint)
            throws Throwable {

        long startTime = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long endTime = System.currentTimeMillis();

        System.out.println(
                "[PERFORMANCE] " +
                        joinPoint.getSignature().toShortString() +
                        " executed in " + (endTime - startTime) + " ms"
        );

        return result;
    }
}
